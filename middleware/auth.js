
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(token === require('../config/keys').auth_token) {
        next();
    } else {
        res.sendStatus(401);
    }
} 

module.exports = auth;
