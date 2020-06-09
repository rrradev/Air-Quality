
    var mongoURI;

    if(process.env.NODE_ENV ==='production'){
        mongoURI = process.env.MONGO_URI;
    } else {
        const secrets = require('../secrets');
        mongoURI = 'mongodb+srv://' + secrets.requestDB(`username`) + ':' +
        secrets.requestDB('password') + '@homeserver-ayepl.mongodb.net/' + 
        secrets.requestDB('name') + '?retryWrites=true&w=majority';
    }
module.exports =  mongoURI;