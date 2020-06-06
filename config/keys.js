const secrets = require('../secrets');

module.exports =  {
    mongoURI: 'mongodb+srv://' + secrets.request(`username`) + ':' +
    secrets.request('password') + '@homeserver-ayepl.mongodb.net/' + 
    secrets.request('dbname') + '?retryWrites=true&w=majority'
}