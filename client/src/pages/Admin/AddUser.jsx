import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Image from '../../assets/Images/image-removebg-preview.png';
import Reg from '../../assets/Images/image.png';

function Register() {
  // const navigate = useNavigate();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'admin'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      console.log(formData)
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/register', formData);
            // Redirect to login page or any other page after successful registration
            Swal.fire({
              icon: 'success',
              title: 'User added successfully!',
              showConfirmButton: false,
              timer: 2000,
              customClass: {
                popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
              },
              iconColor: '#294B29',
            });
            navigate('/')
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
      <div className="md:flex ">
      <div
        //class="flex md:w-1/2 justify-center items-center"
        className="flex-inline md:w-1/2 justify-center items-center">
            <img  className='h-screen w-full' src={Reg} /> 
      </div>
        {/* //class="block md:w-1/2 h-screen justify-center items-center bg-gradient-to-br from-[#B8C294] to-white " */}
      <div className="space-y-4 md:w-1/2 h-screen justify-center items-center bg-gradient-to-br from-[#B8C294] to-white ">
            <img className="block pt-8 w-[40%] justify-center items-center ml-[29%] " src={Image} />
            <div className='block justify-center items-center ml-[22%]'>
            <form className="bg-none align-content-center p-8" onSubmit={handleSubmit} >
            <div className='flex items-center justify-between mb-4'>
            <input className="shadow appearance-none border  bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} /> 
            </div>
            <div className='flex items-center justify-between mb-4'>
            <input className="shadow appearance-none border  bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />   
            </div>
            <div className='flex items-center justify-between mb-4'>
            <input className="shadow appearance-none border  bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
            <div className='flex items-center justify-between mb-4'>
            <select className="shadow appearance-none border  bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="role" value={formData.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className='flex text-center'>
                <button className="bg-[#3C6339] hover:bg-[#B8C294] text-white text-center w-[70%] py-2 px-4 font-bold rounded" type="submit" >Register</button>
            </div>
            </form>
        </div>
      </div>
        </div>
	
    );
}

export default Register;
