
const DBsecrets = {
    username: "",
    password: "",
    name: ""
}
const Auth = {
    token: ""
}

module.exports = {
    requestDB: (secret) => {
        return DBsecrets[secret];
    },
    requestToken: () => {
        return Auth.token;
    }
}