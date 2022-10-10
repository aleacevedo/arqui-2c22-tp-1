const jsonwebtoken = require('jsonwebtoken');
const db = require('../database');

exports.validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            const logedOut = await db.query('SELECT 1 FROM logedout_tokens WHERE id = $1', [decoded.tokenId]);
            if (logedOut.rowCount > 0) {
                return res.status(401).json({ error: 'Token loged out' })
            }
            console.log('User authenticated: ', decoded.username);
            req.user = decoded;
            next();
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};