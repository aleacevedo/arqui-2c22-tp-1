const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const {v4: uuidV4} = require('uuid');
const db = require('../database');

exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const cryptedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(`INSERT INTO users (username, password) VALUES ($1, $2);`, [username, cryptedPassword]);
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const tokenId = uuidV4()
        const result = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);
        if (result.rows.length === 0) {
            return res.status(401).send({ error: 'User not found' });
        }
        const user = result.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            const token = jsonwebtoken.sign({ id: user.id, username: user.username, tokenId }, process.env.JWT_SECRET);
            return res.status(200).json({ token });
        }
        return res.status(401).json({ error: 'Wrong password' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

exports.logout = async (req, res) => {
    try {
        const { tokenId } = req.user

        const result = await db.query(`INSERT INTO logedout_tokens (id) VALUES ($1);`, [tokenId]);
    
        return res.status(200).send()
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

