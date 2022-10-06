const { Router } = require('express');
const { courses } = require('../controllers');

const coursesRouter = Router();

coursesRouter.get('/', courses.getCourses);
coursesRouter.get('/enroll', courses.getErolledCourses);
coursesRouter.post('/enroll', courses.enrollCourse);


module.exports = coursesRouter;