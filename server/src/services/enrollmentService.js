const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.createEnrollment = async (userId, courseId) => {
    
    try {
      const enrollment = new Enrollment({ userId, courseId });
      await enrollment.save();
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  };