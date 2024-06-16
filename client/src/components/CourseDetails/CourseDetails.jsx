// src/components/CourseDetail.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar'; // Adjust the path as needed
import Sidebar from '../../components/sidebar/SideBar'; // Adjust the path as needed

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchCourse = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      try {
        const res = await axios.get(`http://localhost:3000/api/course/getCourse/${courseId}`, config);
        setCourse(res.data);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!course) {
    return <div>No course found.</div>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 hidden sm:block">
        <Sidebar type="student" /> Adjust the type as needed
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Course Details */}
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="text-gray-700 mt-4">{course.description}</p>
          <p className="text-blue-500 font-bold mt-4">${course.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
