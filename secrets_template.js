const DBsecrets = {
    mongoURI : ""
}

const Auth = {
    token: ""
}

module.exports = {
    requestMongoURI: () => {
        return DBsecrets.mongoURI;
    },
    requestToken: () => {
        return Auth.token;
    }
}