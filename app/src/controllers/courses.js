const db = require('../database');

exports.getCourses = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM courses');
        return res.status(200).json({ courses: result.rows });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

exports.getErolledCourses = async (req, res) => {
    try {
        const enrolled = await db.query('SELECT * FROM users_courses WHERE user_id = $1', [req.user.id]);
        const enrolledCoursesId = enrolled.rows.map(courses => courses.course_id);
        const courses = await db.query('SELECT * FROM courses WHERE id = ANY($1::int[])', [enrolledCoursesId]);
        return res.status(200).json({ courses: courses.rows });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

exports.enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courses = await db.query('SELECT * FROM courses WHERE id = $1', [courseId]);
        if (courses.rowCount === 0) {
            return res.send(404).json({ error: 'Course not found!'});
        }
        await db.query('INSERT INTO users_courses (user_id, course_id) VALUES ($1, $2)', [req.user.id, courseId]);
        return res.status(201)
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}