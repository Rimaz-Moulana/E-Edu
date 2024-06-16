import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Image from '../../assets/Images/image-removebg-preview.png';
import Reg from '../../assets/Images/image.png';
import API_URL from '../../config';


function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'admin'
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/register`, formData);
            // Redirect to login page or any other page after successful registration
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('Email is already registered. Please use a different email.');
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="md:flex ">
            <div className="flex-inline md:w-1/2 justify-center items-center">
                <img className='h-screen w-full' src={Reg} alt="Registration image" />
            </div>
            <div className="space-y-4 md:w-1/2 h-screen justify-center items-center bg-gradient-to-br from-[#94bac2] to-white ">
                <img className="block pt-8 w-[40%] justify-center items-center ml-[29%] " src={Image} alt="Logo" />
                <div className='block justify-center items-center ml-[22%]'>
                    <form className="bg-none align-content-center p-8" onSubmit={handleSubmit}>
                        <div className='flex items-center justify-between mb-4'>
                            <input
                                className="shadow appearance-none border bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-center justify-between mb-4'>
                            <input
                                className="shadow appearance-none border bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-center justify-between mb-4'>
                            <input
                                className="shadow appearance-none border bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-center justify-between mb-4'>
                            <select
                                className="shadow appearance-none border bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                             
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                              
                            </select>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 mb-4 w-[70%] py-2 px-3">
                                {errorMessage}
                            </div>
                        )}
                        <div className='flex text-center'>
                            <button className="bg-[#405bd1] hover:bg-[#6275d5] text-white text-center w-[70%] py-2 px-4 font-bold rounded" type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
