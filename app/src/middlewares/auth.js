const jsonwebtoken = require('jsonwebtoken');
const db = require('../database');

exports.validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({ error: 'No token provided' });
        }
        jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ error: 'Invalid token' });
            }
            console.log(decoded)
            const logedOut = await db.query('SELECT 1 FROM logedout_tokens WHERE id = $1', [decoded.tokenId]);
            console.log(logedOut);
            if(logedOut.rowCount > 0) {
                return res.status(401).send({ error: 'Token loged out' })
            }
            req.user = decoded;
            next();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};