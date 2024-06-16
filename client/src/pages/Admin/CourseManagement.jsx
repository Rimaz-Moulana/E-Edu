// src/pages/CourseList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCourseModal from '../../components/modal/AddCourseModal'; // Import the modal component for adding courses
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editedCourseData, setEditedCourseData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchCourses = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        };
        const response = await axios.get('http://localhost:3000/api/course/getCourses', config); // Corrected endpoint
        setCourses(response.data);
        
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();

    const timeout = setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      navigate('/');
    }, 7200000); // 2 hours

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, [navigate]);

  const deleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      };
      await axios.delete(`http://localhost:3000/api/course/deleteCourse/${courseId}`, config); // Corrected endpoint
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course._id);
    setEditedCourseData({ ...course });
  };

  const handleEditChange = (e) => {
    setEditedCourseData({ ...editedCourseData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      };
      await axios.put(`http://localhost:3000/api/course/updateCourse/${editedCourseData._id}`, editedCourseData, config); // Corrected endpoint
      setEditingCourse(null);
      setCourses(courses.map(course => (course._id === editedCourseData._id ? editedCourseData : course)));
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className='bg-[#ffffff] overflow-x-hidden'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col">
        <Sidebar type="admin" />
      </div>
      <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
      </div>
      <h1 className="mb-8 mt-20 text-3xl lg:ml-72 sm:ml-40 md:mr-50 text-left font-semibold text-[#5f75d6]">Courses Details</h1>
      <div className='inline-flex ml-[75%] w-[20%] h-[1%] mt-0'>
        <button
          className="z-10 w-[60%] text-white bg-gradient-to-t from-[#5f75d6] to-[#001c98] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          onClick={() => setModalIsOpen(true)}
        >
          + Add New Course
        </button>
      </div>
      <div className="container mx-auto mt-10 w-[80%] h-[100%] lg:ml-64 sm:ml-20 md:ml-40">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6 text-center text-lg font-medium uppercase">Course Title</th>
              <th className="py-3 px-6 text-center text-lg font-medium uppercase">Description</th>
              <th className="py-3 px-6 text-center text-lg font-medium uppercase">Price</th>
              <th className="py-3 px-6 text-center text-lg font-medium uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map(course => (
              <tr key={course._id} className="hover:bg-gray-100">
                <td className="py-4 px-6 whitespace-nowrap">{course.title}</td>
                <td className="py-4 px-6 whitespace-nowrap">{course.description}</td>
                <td className="py-4 px-6 whitespace-nowrap">{course.price}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleEdit(course)}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteCourse(course._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingCourse && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Course</h2>
            <div className="mb-4">
              <label className="block mb-1">Course Title:</label>
              <input type="text" name="title" value={editedCourseData.title} onChange={handleEditChange} className="w-full border border-gray-400 p-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description:</label>
              <textarea name="description" value={editedCourseData.description} onChange={handleEditChange} className="w-full border border-gray-400 p-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Price:</label>
              <input type="number" name="price" value={editedCourseData.price} onChange={handleEditChange} className="w-full border border-gray-400 p-2 rounded" />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditSubmit}>Save</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => setEditingCourse(null)}>Cancel</button>
          </div>
        </div>
      )}
      <AddCourseModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default CourseList;
