const secrets = require('../secrets');

    const mongoURI;

    if(process.env.NODE_ENV ==='production'){
        mongoURI = 'mongodb+srv://' + process.env.DATABASE_USER + ':' +
        process.env.DATABASE_PASSWORD + '@homeserver-ayepl.mongodb.net/' + 
        process.env.DATABASE_NAME + '?retryWrites=true&w=majority';;
    } else {
        mongoURI = 'mongodb+srv://' + secrets.requestDB(`username`) + ':' +
        secrets.requestDB('password') + '@homeserver-ayepl.mongodb.net/' + 
        secrets.requestDB('name') + '?retryWrites=true&w=majority';
    }
module.exports =  mongoURI;