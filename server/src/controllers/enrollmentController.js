// src/controllers/enrollmentController.js
const Enrollment = require('../models/Enrollment'); // Import your enrollment model
const Course = require('../models/Course'); // Import your course model
const User = require("../models/user");

exports.enrollInCourse = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({email:email})
    const userId = user._id; // Assuming the user ID is available from the request (e.g., from middleware)
    const { courseId, status } = req.body;

    console.log(userId, courseId, status);
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = new Enrollment({
      userId,
      courseId,
      status,
    });

    await enrollment.save();
    res.status(200).json({ message: 'Enrollment successful', enrollment });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
