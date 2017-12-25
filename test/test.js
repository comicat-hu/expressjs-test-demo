const request = require('supertest');
const chai = require('chai');
const cheerio = require('cheerio');
const server = require('../index.js');
const expect = chai.expect;

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

                var $ = cheerio.load(res.text);
                var csrfToken = $('input[name=_csrf]').val();
                var cookie = res.headers['set-cookie'];

                request(server)
                    .post('/login')
                    .type('form')
                    .set('Cookie', cookie)
                    .send({
                        _csrf: csrfToken
                    })
                    .end((err, res) => {
                        expect(err).to.not.exist;
                        expect(res.status).to.equal(200);
                        expect(res.text).to.equal('login success');

                        done();
                    });
            });
    });
});