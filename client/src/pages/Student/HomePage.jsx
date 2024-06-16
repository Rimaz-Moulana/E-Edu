import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import CourseCard from '../../components/Cards/CourseCards';
import Navbar from '../../components/navbar/HomepageNavbar';

const Homepage = () => {
  const [courses, setCourses] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token); // Check if the user is logged in

    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/course/getCourses');
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();

    // Load enrollment status from local storage
    const storedEnrollmentStatus = JSON.parse(localStorage.getItem('enrollmentStatus')) || {};
    setEnrollmentStatus(storedEnrollmentStatus);
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleEnrollment = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      if (!token) {
        navigate('/login');
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      await axios.post('http://localhost:3000/api/enroll/enroll', { courseId, status: 'pending', email }, config);
      
      // Update the enrollment status in state and local storage
      const updatedEnrollmentStatus = { ...enrollmentStatus, [courseId]: 'enrolled' };
      setEnrollmentStatus(updatedEnrollmentStatus);
      localStorage.setItem('enrollmentStatus', JSON.stringify(updatedEnrollmentStatus));

      swal('Success', 'You have successfully enrolled in the course!', 'success');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      swal('Error', 'Failed to enroll in the course. Please try again later.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar loggedIn={loggedIn} />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>
        <div className="flex flex-wrap justify-center">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onCourseClick={handleCourseClick}
              onEnrollClick={handleEnrollment}
              loggedIn={loggedIn}
              enrollmentStatus={enrollmentStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
