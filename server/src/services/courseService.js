const Course = require("../models/Course");

exports.createCourse = async ( title, description, price) => {
  //const { title, description, price } = req.body;
  //console.log(title, description, price);

  try {
    const course = new Course({ title:title, description:description, price: price });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.deleteCourse = async ( courseId ) => {
  try {
    console.log(courseId);
    await Course.deleteOne({ _id : courseId });
  }
  catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
}




// Implement other CRUD operations (updateCourse, deleteCourse) similarly
