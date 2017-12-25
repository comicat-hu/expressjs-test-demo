const request = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const server = require('../index.js');

describe('Base Testing', () => {
    it('Should work', (done) => {
        request(server)
            .get('/')
            .end((err, res) => {
                expect(err).to.not.exist
                expect(res.status).to.equal(200)
                done()
            })
    })

    it('Should have Hello Wolrd!', (done) => {
        request(server)
            .get('/')
            .end((err, res) => {
                expect(err).to.not.exist
                expect(res.text).to.equal('Hello World!')
                done()
            })
    })
})