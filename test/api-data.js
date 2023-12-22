const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const crypto = require('crypto');
const { randomData } = require('./util/testHelper')

const URI = '/api/data';

chai.use(chaiHttp);

describe('Test route ' + URI, () => {
    before(function () {
        if (process.env.NODE_ENV === 'production')
            this.skip();
    });

    const TOKEN = require('../config/keys').authToken;
    const AUTH = {
        'x-auth-token': TOKEN,
    };

    const TEST_DATA = randomData();

    it('should NOT allow submitting data without authorization', async () => {
        let res = await chai.request(server)
            .post(URI);

        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Missing Authorization header: x-auth-token");
    });

    it('should NOT allow submitting data with wrong authorization', async () => {
        let randomString = crypto.randomBytes(20).toString('hex');

        let res = await chai.request(server)
            .post(URI)
            .set('x-auth-token', randomString);

        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Invalid token.");
    });

    it('should allow submitting data', async () => {
        let { pm25, pm10, temp, hum } = TEST_DATA;

        let res = await chai.request(server)
            .post(URI)
            .set(AUTH)
            .send(TEST_DATA);

        expect(res).to.have.status(201);
        expect(res.body.pm25, "pm25 is correct").to.equal(pm25);
        expect(res.body.pm10, "pm10 is correct").to.equal(pm10);
        expect(res.body.temp, "temp is correct").to.equal(temp);
        expect(res.body.hum, "hum is correct").to.equal(hum);
        expect(res.body._id, "id is returned").to.not.be.empty;
    });

    it('should return the last data entry', async () => {
        let { pm25, pm10, temp, hum } = TEST_DATA;

        let res = await chai.request(server)
            .get(URI);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.pm25, "pm25 is correct").to.equal(pm25);
        expect(res.body.pm10, "pm10 is correct").to.equal(pm10);
        expect(res.body.temp, "temp is correct").to.equal(temp);
        expect(res.body.hum, "hum is correct").to.equal(hum);
    });

    it('should return data for the past 24 hours', async () => {
        let res = await chai.request(server)
            .get(URI)
            .query({ hours: '24' });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.not.have.length(0);
    });

    it('should return data for the past 30 days grouped hourly', async () => {
        let res = await chai.request(server)
            .get(URI)
            .query({ days: '30', groupByHour: 'true' });

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.not.have.length(0);
    });

    it('should NOT delete data with invalid id', async () => {
        let id = '1';

        let res = await chai.request(server)
            .delete(URI.concat("/").concat(id))
            .set(AUTH)
            .send();

        expect(res).to.have.status(404);
        expect(res.body.id, ":id is returned in body").to.equal(id);
    });

    it('should delete data with id', async () => {
        let data = randomData();

        let id = await chai.request(server)
            .post(URI)
            .set(AUTH)
            .send(data)
            .then(res => res.body._id);

        let res = await chai.request(server)
            .delete(URI.concat("/").concat(id))
            .set(AUTH)
            .send();

        expect(res).to.have.status(200);
        expect(res.body.id, ":id is returned in body").to.equal(id);
    });

    it('should NOT delete data without authorization', async () => {
        let id = '1';

        let res = await chai.request(server)
            .delete(URI.concat("/").concat(id))
            .send();

        expect(res).to.have.status(401);
    });

});
