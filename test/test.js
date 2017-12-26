const request = require('supertest');
const chai = require('chai');
const cheerio = require('cheerio');
const sinon = require('sinon');
const server = require('../index.js');
const expect = chai.expect;
var DataBase = require('../lib/DataBase.js');

describe('Base Test', () => {
    it('Should work', (done) => {
        request(server)
            .get('/')
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('Should have Hello Wolrd!', (done) => {
        request(server)
            .get('/')
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.text).to.equal('Hello World!');
                done();
            });
    });
});

describe('Login Test', () => {
    it('Should login success', (done) => {
        request(server)
            .get('/login')
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);

                // Get csrf token
                var $ = cheerio.load(res.text);
                var csrfToken = $('input[name=_csrf]').val();
                var cookie = res.headers['set-cookie'];

                // Modify an object
                var stubbed = sinon.stub(DataBase, 'get').callsFake((option, callback) => {
                    return callback({
                        username: 'test01',
                        password: 'test01pwd'
                    });
                });

                var formData = {
                    username: 'test01',
                    password: 'test01pwd',
                    _csrf: csrfToken
                };

                request(server)
                    .post('/login')
                    .type('form')
                    .set('Cookie', cookie)
                    .send(formData)
                    .end((err, res) => {
                        expect(err).to.not.exist;
                        expect(res.status).to.equal(200);
                        expect(res.text).to.equal('login success');

                        // Restore original method
                        stubbed.restore();

                        done();
                    });

            });
    });
});