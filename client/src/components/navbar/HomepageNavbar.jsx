import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/Images/image-removebg-preview.png";

const Navbar = ({ loggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex p-2 bg-[#ffffff]">
          <img src={logo} className="h-16 w-32 place-items-start width-full ml-0" alt="NutriTech Logo" />
        </div>
        <Link to="/" className="text-2xl font-bold text-blue-500">
          E-Learning
        </Link>
        <div>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-500 mr-4">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
