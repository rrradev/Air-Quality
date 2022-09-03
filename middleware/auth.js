const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (token === require('../config/keys').auth_token) {
        next();
    } else if (token) {
        res.status(401).json({ "error": "Invalid token." });
    } else {
        res.status(401).json({ "error": "Missing Authorization header." });
    }
}

module.exports = auth;
