import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';

const UserList = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchEnrollments = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        };
        const response = await axios.get('http://localhost:3000/api/enrollments', config);
        setEnrollments(response.data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchEnrollments();

    const timeout = setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      navigate('/');
    }, 7200000); // 2 hours

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, [navigate]);

  


  const handleAcceptEnrollment = async (enrollmentId) => {
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
      await axios.post(`http://localhost:3000/api/enrollments/accept/${enrollmentId}`, {}, config);
      setEnrollments(enrollments.map(enrollment => 
        enrollment._id === enrollmentId ? { ...enrollment, status: 'accepted' } : enrollment
      ));
    } catch (error) {
      console.error('Error accepting enrollment:', error);
    }
  };

  const handleRemoveEnrollment = async (enrollmentId) => {
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
      await axios.delete(`http://localhost:3000/api/enroll/deleteEnrollment/${enrollmentId}`, config);
      setEnrollments(enrollments.filter(enrollment => enrollment._id !== enrollmentId));
    } catch (error) {
      console.error('Error removing enrollment:', error);
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
      <h1 className="mb-8 mt-20 text-3xl lg:ml-72 sm:ml-40 md:mr-50 text-left font-semibold text-[#5f75d6]">Enrollment Details</h1>
      <div className="container mx-auto mt-10 w-[80%] h-[100%] lg:ml-64 sm:ml-20 md:ml-40">
        <h2 className="mt-10 mb-4 text-2xl font-bold">Enrollment Requests</h2>
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6 text-center text-lg font-medium uppercase">User</th>
              <th className="py-3 px-6 text-center text-lg font-medium uppercase">Course</th>
              <th className="py-3 px-6 text-center text-lg font-medium uppercase">Status</th>
              <th className="py-3 px-6 text-center text-lg font-medium uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enrollments.map(enrollment => (
              <tr key={enrollment._id} className="hover:bg-gray-100">
                <td className="py-4 px-6 whitespace-nowrap">{enrollment.userId}</td> {/* Update to show the actual username */}
                <td className="py-4 px-6 whitespace-nowrap">{enrollment.courseId}</td> {/* Update to show the actual course name */}
                <td className="py-4 px-6 whitespace-nowrap">{enrollment.status}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {enrollment.status !== 'accepted' && (
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleAcceptEnrollment(enrollment._id)}>Accept</button>
                  )}
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRemoveEnrollment(enrollment._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
