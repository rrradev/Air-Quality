const secrets = require('../secrets');

module.exports =  {
    mongoURI: 'mongodb+srv://' + secrets.requestDB(`username`) + ':' +
    secrets.requestDB('password') + '@homeserver-ayepl.mongodb.net/' + 
    secrets.requestDB('name') + '?retryWrites=true&w=majority'
}