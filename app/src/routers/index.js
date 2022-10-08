const { Router } = require('express');
const authRouter = require('./auth');
const coursesRouter = require('./courses');
const { authMiddleware } = require('../middlewares');


const apiRouter = Router();

apiRouter.use('/courses', authMiddleware.validateToken ,coursesRouter)
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;