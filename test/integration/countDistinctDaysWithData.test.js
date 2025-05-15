const mongoose = require("mongoose");
const Data = require("../../models/Data.js");
const { randomData } = require("../util/data-generator.js");
const { countDistinctDaysWithData } = require("../../lib/db/db_pipelines.js");
const { removeRandom } = require("../util/array-utils.js");
const { expect } = require("chai");
const { MongoMemoryServer } = require("mongodb-memory-server");

/**
 * @type {MongoMemoryServer}
 */
let mongoServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    await Data.deleteMany({});
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('countDistinctDaysWithData()', () => {

    before(async () => {
        const now = Date.now();
        const _20docs = Array.from({ length: 20 }, (_, i) => ({
            ...randomData(),
            date: new Date(now - i * 24 * 60 * 60 * 1000),
        }));

        const _17docs = removeRandom(3, _20docs);
        await Data.insertMany(_17docs);
    });

    it('should returns correct value for the past 20 days', async () => {
        const pastDate = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);
        const daysWithDataResult = await Data.aggregate(countDistinctDaysWithData(pastDate));
        expect(daysWithDataResult).to.deep.equal([{ distinctDaysWithData: 17 }]);
    });
});
