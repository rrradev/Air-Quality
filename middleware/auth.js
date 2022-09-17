const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (token === require('../config/keys').authToken) {
        next();
    } else if (token) {
        res.status(401).json({ "error": "Invalid token." });
    } else {
        res.status(401).json({ "error": "Missing Authorization header: x-auth-token" });
    }
}

module.exports = auth;
