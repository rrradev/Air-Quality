const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const crypto = require('crypto');

const dataUri = '/api/data';

chai.use(chaiHttp);

describe('Test route ' + dataUri, () => {
    before(function () {
        if (process.env.NODE_ENV === 'production')
            this.skip();
    });

    const pm25 = crypto.randomInt(1, 100);
    const pm10 = crypto.randomInt(1, 100);
    const temp = crypto.randomInt(1, 100);
    const hum = crypto.randomInt(1, 100);

    it('It should NOT allow submitting data without authorization', async () => {
        let res = await chai.request(server)
            .post(dataUri);

        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Missing Authorization header: x-auth-token");
    });

    it('It should NOT allow submitting data with wrong authorization', async () => {
        let randomString = crypto.randomBytes(20).toString('hex');

        let res = await chai.request(server)
            .post(dataUri)
            .set('x-auth-token', randomString);

        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Invalid token.");
    });

    it('It should allow submitting data', async () => {
        let token = require('../config/keys').authToken;

        let res = await chai.request(server)
            .post(dataUri)
            .set('x-auth-token', token)
            .send({ pm25, pm10, temp, hum });

        expect(res).to.have.status(201);
        expect(res.body.pm25, "pm25 is correct").to.equal(pm25);
        expect(res.body.pm10, "pm10 is correct").to.equal(pm10);
        expect(res.body.temp, "temp is correct").to.equal(temp);
        expect(res.body.hum, "hum is correct").to.equal(hum);
    });

    it('It should return the last data entry', async () => {
        let res = await chai.request(server)
            .get(dataUri);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.pm25, "pm25 is correct").to.equal(pm25);
        expect(res.body.pm10, "pm10 is correct").to.equal(pm10);
        expect(res.body.temp, "temp is correct").to.equal(temp);
        expect(res.body.hum, "hum is correct").to.equal(hum);
    });

    it('It should return data for the past 24 hours', async () => {
        let res = await chai.request(server)
            .get(dataUri)
            .query({ hours: '24' });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.not.have.length(0);
    });

    it('It should return data for the past 30 days grouped hourly', async () => {
        let res = await chai.request(server)
            .get(dataUri)
            .query({ days: '30', groupByHour: 'true' });

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.not.have.length(0);
    });

});