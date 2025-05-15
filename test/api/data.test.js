const { expect } = require('chai');
const crypto = require('crypto');
const { randomData } = require('../util/data-generator');
const { expectToDeepEqualIgnoringFields, expectDatesToBeWithinSeconds } = require('../util/custom-assert');
const { http, post, get, del } = require('./config/setup');

const URI = '/api/data';

describe('Test route ' + URI, () => {

    const RANDOM_TEST_DATA = randomData();
    const FIELDS_TO_IGNORE = ['__v', '_id', 'date'];

    it('should NOT allow submitting data without authorization', async () => {
        const res = await http()
            .post(URI);

        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Missing Authorization header: x-auth-token");
    });

    it('should NOT allow submitting data with wrong authorization', async () => {
        const randomString = crypto.randomBytes(20).toString('hex');

        const res = await http()
            .post(URI)
            .set('x-auth-token', randomString);

        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Invalid token.");
    });

    it('should allow submitting data', async () => {
        const res = await post(URI)
            .send(RANDOM_TEST_DATA);

        expect(res).to.have.status(201);
        expectToDeepEqualIgnoringFields(res.body, RANDOM_TEST_DATA, FIELDS_TO_IGNORE);
        expect(res.body._id, "id is returned").to.not.be.empty;
        expectDatesToBeWithinSeconds(new Date(res.body.date), new Date(), 10);
    });

    it('should return the last data entry', async () => {
        const res = await get(URI);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expectToDeepEqualIgnoringFields(res.body, RANDOM_TEST_DATA, FIELDS_TO_IGNORE);
    });

    it('should return data for the past 24 hours', async () => {
        const res = await get(URI)
            .query({ hours: '24' });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.not.have.length(0);
    });

    it('should return data for the past 30 days grouped hourly', async () => {
        const res = await get(URI)
            .query({ days: '30', groupByHour: 'true' });

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.not.have.length(0);
    });

    it('should NOT delete data with invalid id', async () => {
        const TEST_ID = '1';

        const res = await del(URI.concat("/").concat(TEST_ID))
            .send();

        expect(res).to.have.status(404);
        expect(res.body.id, ":id is returned in body").to.equal(TEST_ID);
    });

    it('should delete data with id', async () => {
        const TEST_DATA = randomData();

        const id = await post(URI)
            .send(TEST_DATA)
            .then(res => res.body._id);

        const res = await del(URI.concat("/").concat(id))
            .send();

        expect(res).to.have.status(200);
        expect(res.body.id, ":id is returned in body").to.equal(id);
    });

    it('should NOT delete data without authorization', async () => {
        const TEST_ID = '1';

        const res = await http()
            .delete(URI.concat("/").concat(TEST_ID))
            .send();

        expect(res).to.have.status(401);
    });

    it('should accept numeric strings and 0s', async () => {
        const TEST_DATA = {
            pm25: "0.0",
            pm10: 0.0,
            temp: "-1",
            hum: "85.22",
        };
        const { pm25, pm10, temp, hum } = TEST_DATA;

        const res = await post(URI)
            .send(TEST_DATA);

        expect(res).to.have.status(201);
        expect(res.body.pm25, "pm25 is correct").to.equal(parseFloat(pm25));
        expect(res.body.pm10, "pm10 is correct").to.equal(parseFloat(pm10));
        expect(res.body.temp, "temp is correct").to.equal(parseFloat(temp));
        expect(res.body.hum, "hum is correct").to.equal(parseFloat(hum));
    });

    it('should NOT accept incomplete data', async () => {
        const TEST_DATA = {
            pm25: 1,
            pm10: 2,
            temp: 3,
        };

        const res = await post(URI)
            .send(TEST_DATA);

        expect(res).to.have.status(400);
        expect(res.body[0].error, "Error is correct").to.equal("Invalid Data.");
        expect(res.body[1], "Submitted data is returned").to.deep.equal(TEST_DATA);
    });

    it('should NOT accept NaNs', async () => {
        const TEST_DATA = {
            pm25: 1,
            pm10: 2,
            temp: 3,
            hum: "asd",
        };

        const res = await post(URI)
            .send(TEST_DATA);

        expect(res).to.have.status(400);
        expect(res.body[0].error, "Error is correct").to.equal("Invalid Data.");
        expect(res.body[1], "Data is returned").to.deep.equal(TEST_DATA);
    });

    it('should round the data to 2 decimal places', async () => {
        const TEST_DATA = {
            pm25: 1.1254,
            pm10: 2.424323,
            temp: "-23.1231",
            hum: 0,
        };

        const EXPECTED_DATA = {
            pm25: 1.13,
            pm10: 2.42,
            temp: -23.12,
            hum: 0
        }

        const res = await post(URI)
            .send(TEST_DATA);

        expect(res).to.have.status(201);
        expectToDeepEqualIgnoringFields(res.body, EXPECTED_DATA, FIELDS_TO_IGNORE);
    });

    it('should NOT accept negative pm25', async () => {
        const TEST_DATA = { pm25: -5, pm10: 15, temp: 20, hum: 40 };
        const res = await post(URI)
            .send(TEST_DATA);

        expect(res).to.have.status(400);
        expect(res.body.error, "Error message should match").to.equal("Invalid Data. pm25, pm10, and hum cannot be negative.");
    });

    it('should NOT accept negative pm10', async () => {
        const TEST_DATA = { pm25: 10, pm10: -15, temp: 20, hum: 40 };
        const res = await post(URI)
            .send(TEST_DATA);

        expect(res).to.have.status(400);
        expect(res.body.error, "Error message should match").to.equal("Invalid Data. pm25, pm10, and hum cannot be negative.");
    });

    it('should NOT accept negative hum', async () => {
        const TEST_DATA = { pm25: 10, pm10: 15, temp: 20, hum: -40 };
        const res = await post(URI)
            .send(TEST_DATA);

        expect(res).to.have.status(400);
        expect(res.body.error, "Error message should match").to.equal("Invalid Data. pm25, pm10, and hum cannot be negative.");
    });

});
