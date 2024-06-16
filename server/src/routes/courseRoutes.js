// backend/routes/courseRoutes.js
const express = require('express');
const CourseController = require('../controllers/courseController');
const router = express.Router();

router.post('/addCourse', CourseController.createCourse);
router.get('/getCourses', CourseController.getCourses);
router.delete("/deleteCourse/:courseId", CourseController.deleteCourse);
router.put("/updateCourse/:courseId", CourseController.updateCourse);
router.get("/getCourse/:courseId", CourseController.getCourseById);

module.exports = router;
 