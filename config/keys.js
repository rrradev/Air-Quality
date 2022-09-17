let mongoURI, authToken;

mongoURI = process.env.MONGO_URI || require('../secrets').requestMongoURI();
authToken = process.env.AUTH_TOKEN || require('../secrets').requestToken();

module.exports = {
    mongoURI,
    authToken
} 