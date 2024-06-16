import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Image from '../../assets/Images/image-removebg-preview.png';
import Image1 from '../../assets/Images/login.jpeg';

Modal.setAppElement('#root'); // Make sure to set the app element for accessibility

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [modalError, setModalError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/login', formData);
            const { token, redirect } = res.data;;

            // Save token to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('email', formData.email);

            // Redirect to dashboard or any other page after successful login
            window.location.href = redirect;

            // Schedule token expiration check
            setTimeout(() => {
                // Remove token from local storage after 5 seconds
                localStorage.removeItem('token');
            }, 720000); // 5 seconds
        } catch (error) {
            setErrorMessage('Invalid email or password. Please try again.');
            console.error('Login failed:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAdminPassword('');
        setModalError('');
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        if (adminPassword === 'NutriTech4321') {
            navigate('/register');
            closeModal();
        } else {
            setModalError('Incorrect password. Please try again.');
        }
    };

   

    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },
        content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            animation: 'fadeIn 0.3s ease-in-out'
        }
    };

    return (
        <div className="md:flex">
            <div className="flex-inline md:w-1/2 justify-center items-center">
                <img className='h-screen w-full' src={Image1} alt="login image" />
            </div>
            <div className="space-y-4 md:w-1/2 h-screen justify-center items-center bg-gradient-to-br from-[#94bac2] to-white">
                <img className="block pt-8 w-[40%] justify-center items-center ml-[29.5%]" src={Image} alt="logo image" />
                <div className='block justify-center items-center ml-[22%]'>
                    <form className="bg-none align-content-center p-8" onSubmit={handleSubmit}>
                        <div className='flex items-center justify-between mb-4'>
                            <input
                                type="email"
                                name="email"
                                className="shadow appearance-none border rounded w-[70%] py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex mb-4'>
                            <input
                                type="password"
                                id="password"
                                name='password'
                                className="shadow appearance-none border bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 mb-4 py-2 px-3 w-[70%]">
                                {errorMessage}
                            </div>
                        )}
                        <div>
                            <div className='flex text-center'>
                                <button  type='submit' className="bg-[#405bd1] hover:bg-[#6275d5] text-white text-center w-[70%] py-2 px-4 font-bold rounded">
                                    Login
                                </button>
                            </div>
                            <div className='flex mt-5 text-center'>
                                <button type='button' onClick={openModal} className="bg-[#102812] hover:bg-[#6877dc] text-white text-center w-[70%] py-2 px-4 font-bold rounded">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Admin Password Modal"
                style={modalStyles}
            >
                <div className="modal-content" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 className="text-xl mb-4">Admin Access Required</h2>
                    <p className="mb-4">If you are an admin, please enter the password to register.</p>
                    <form onSubmit={handleModalSubmit}>
                        <input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {modalError && (
                            <div className="text-red-500 mt-2">
                                {modalError}
                            </div>
                        )}
                        <div className="mt-4 flex justify-end">
                            <button type="button" onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Cancel
                            </button>
                            <button type="submit" className="bg-[#3C6339] hover:bg-[#B8C294] text-white font-bold py-2 px-4 rounded">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
