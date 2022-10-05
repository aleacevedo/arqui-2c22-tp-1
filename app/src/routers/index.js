const { Router } = require('express');
const authRouter = require('./auth');
const { authMiddleware } = require('../middlewares');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

module.exports = apiRouter;