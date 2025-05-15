const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const authToken = require('../../../config/keys').authToken;
const mongoose = require('mongoose');

chai.use(chaiHttp);

const AUTH = {
    'x-auth-token': authToken,
};

const http = () => {
    return chai.request(server);
}

const get = (uri) => {
    return http().get(uri);
};

/**
 * AUTH post req
 */
const post = (uri) => {
    return http()
        .post(uri)
        .set(AUTH);
};

/**
 * AUTH delete req
 */
const del = (uri) => {
    return http()
        .delete(uri)
        .set(AUTH);
};

after(async () => {
    server.close();
    await mongoose.connection.close()
});

module.exports = {
    http, post, get, del,
}
