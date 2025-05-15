const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const Data = require("../../../models/Data");

/**
 * @type {MongoMemoryServer}
 */
let mongoServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create(
        {
            instance: {
                port: 58538,
            },
        }
    );
    await mongoose.connect(mongoServer.getUri());
    await Data.deleteMany({});
    await mongoose.disconnect();
});

const getMongoUri = () => mongoServer.getUri();

after(async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
});

module.exports = {
    getMongoUri
}

