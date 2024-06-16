const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    try {
        const decodedToken = jwt.verify(token, 'secret_key');
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = { authenticateUser };
