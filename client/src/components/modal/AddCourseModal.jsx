// src/components/AddCourseModal.js
import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

const AddCourseModal = ({ isOpen, onRequestClose }) => {
  const [courseData, setCourseData] = React.useState({
    title: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      onRequestClose();
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      await axios.post('http://localhost:3000/api/course/addCourse', courseData, config);
      Swal.fire({
        title: 'Success!',
        text: 'Course added successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onRequestClose(); // Close the modal after adding the course
    } catch (error) {
      console.error('Error adding course:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add course.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add New Course"
    >
      <h2 className="text-2xl mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Course Title:</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Course
        </button>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={onRequestClose}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddCourseModal;
