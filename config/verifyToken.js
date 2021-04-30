const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified) return res.status(401).send('Access Denied');
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).send('Access Denied');
    }
}

module.exports = auth;