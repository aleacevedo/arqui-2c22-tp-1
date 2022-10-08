const { Router } = require('express');
const { auth } = require('../controllers');
const { authMiddleware } = require('../middlewares');


const authRouter = Router();

authRouter.post('/sign-up', auth.createUser);
authRouter.post('/login', auth.login);
authRouter.post('/logout', authMiddleware.validateToken, auth.logout);

module.exports = authRouter;