const { Router } = require('express');
const { auth } = require('../controllers');

const authRouter = Router();

authRouter.post('/sign-up', auth.createUser);
authRouter.post('/login', auth.login);

module.exports = authRouter;