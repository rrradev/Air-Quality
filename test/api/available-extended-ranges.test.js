const { get } = require("./config/setup.js");
const sinon = require("sinon");
const Data = require("../../models/Data.js");
const { expect } = require('chai');

const URI = '/api/available-extended-ranges';

describe('Test route ' + URI, () => {

    /**
     * @type {sinon.SinonStub}
     */
    let aggregateStub;

    beforeEach(() => {
        aggregateStub = sinon.stub(Data, "aggregate");
    });

    const ranges = [
        { id: '1m', days: 30 },
        { id: '3m', days: 90 },
        { id: '6m', days: 180 },
        { id: '1y', days: 365 },
    ];

    it('does NOT meet 80% distinct days with data criteria for All ranges', async () => {
        ranges.forEach((range, idx) => {
            aggregateStub.onCall(idx).resolves([{ distinctDaysWithData: range.days * 0.79 }]);
        });

        const res = await get(URI);
        expect(res).to.have.status(200);
        expect(res.body.ranges).to.deep.equal([]);
    });

    it('meets 80% distinct days with data criteria for All ranges ', async () => {
        ranges.forEach((range, idx) => {
            aggregateStub.onCall(idx).resolves([{ distinctDaysWithData: range.days * 0.8 }]);
        });

        const res = await get(URI);
        expect(res).to.have.status(200);
        expect(res.body.ranges).to.deep.equal(ranges.map(r => r.id));
    });

    it('meets 80% distinct days with data criteria for 1m range ', async () => {
        aggregateStub.onCall(0).resolves([{ distinctDaysWithData: ranges[0].days * 0.8 }]);

        ranges.slice(1).forEach((range, idx) => {
            aggregateStub.onCall(idx + 1).resolves([{ distinctDaysWithData: range.days * 0.79 }]);
        });

        const res = await get(URI);
        expect(res).to.have.status(200);
        expect(res.body.ranges).to.deep.equal(["1m"]);
    });

    it('meets 80% distinct days with data criteria for 1m & 3m ranges', async () => {
        aggregateStub.onCall(0).resolves([{ distinctDaysWithData: ranges[0].days * 0.8 }]);
        aggregateStub.onCall(1).resolves([{ distinctDaysWithData: ranges[1].days * 0.8 }]);

        ranges.slice(2).forEach((range, idx) => {
            aggregateStub.onCall(idx + 2).resolves([{ distinctDaysWithData: range.days * 0.79 }]);
        });

        const res = await get(URI);
        expect(res).to.have.status(200);
        expect(res.body.ranges).to.deep.equal(["1m", "3m"]);
    });

    it('fallbacks if aggregation pipeline is broken', async () => {
        aggregateStub.resolves([]);

        const res = await get(URI);
        expect(res).to.have.status(200);
        expect(res.body.ranges).to.deep.equal([]);
    });

    afterEach(() => {
        aggregateStub.restore();
    });
});
