// src/routes/enrollmentRoutes.js
const express = require('express');
const EnrollController = require('../controllers/enrollmentController');


const router = express.Router();

router.post('/enroll', EnrollController.enrollInCourse); // Ensure user is authenticated

module.exports = router;
