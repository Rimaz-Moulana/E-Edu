const CourseService = require("../services/courseService");
const Course = require("../models/Course");
exports.createCourse = async (req, res) => {
  const { title, description, price } = req.body;

  
  try {
    const course = await CourseService.createCourse(title, description, price);
    
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    //console.log(courses);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.deleteCourse = async (req, res) => {
    try{
        const courseId = req.params.courseId;
        
        await CourseService.deleteCourse(courseId);
    }catch(err){
        res.status(500).json({ msg: 'Server error' });
    }
}


exports.updateCourse = async (req, res) => {
    try {
      const courseId = req.body._id; 
      
      const { title, description, price} = req.body; // Destructuring request body
      
      // Check if the user exists
      //console.log("test:", req.body);
      const course = await Course.findById(courseId);

      // console.log(course);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Update user fields if provided in the request body
      if (title) course.title = title;
      if (description) course.description = description;
      if (price) course.price = price;


      
       
      const updatedCourse = await course.save();
      res.json(updatedCourse); 
    } catch (error) {
      console.error('Error updating Course:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getCourseById = async (req, res) => {
    try {
      const courseId = req.params.courseId; 

      
      const course = await Course.findById(courseId);
      console.log(course)
      res.json(course);
    }
    catch (error) {
      console.error('Error updating Course:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}


