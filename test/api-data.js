const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const endpoint = '/api/data';

chai.use(chaiHttp);

describe('Test route ' + endpoint, () => {
    it('It should return data for the past hour', async () => {
        let res = await chai.request(server)
            .get(endpoint)
            .query({ hours: '1' });

        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
    });

    it('It should return data for the past 3 hours', async () => {
        let res = await chai.request(server)
            .get(endpoint)
            .query({ hours: '3' });

        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
    });

    it('It should return data for the past 12 hours', async () => {
        let res = await chai.request(server)
            .get(endpoint)
            .query({ hours: '12' });

        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
    });
});