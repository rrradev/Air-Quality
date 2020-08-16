    var mongoURI, auth_token;

    if(process.env.NODE_ENV ==='production'){
        mongoURI = process.env.MONGO_URI;
        auth_token = process.env.AUTH_TOKEN;
    } else {
        const secrets = require('../secrets');
        
        mongoURI = secrets.requestMongoURI();
        auth_token = secrets.requestToken();
    }
module.exports = {
    mongoURI,
    auth_token
} 