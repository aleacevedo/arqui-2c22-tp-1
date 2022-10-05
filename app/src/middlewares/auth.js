const jsonwebtoken = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};