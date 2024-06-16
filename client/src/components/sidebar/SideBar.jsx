import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import edit from '../../assets/Images/edit.png';
import home from '../../assets/Images/home.png';
import menu from '../../assets/Images/menu.png';


// const Sidebar = ({type,onValueChange}) => {
const Sidebar = ({ type, onValueChange }) => {
  const [isEnlarge, setEnlarge] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/getUser/${email}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [email]);


  const navStudent = [
    { icon: home, selectedIcon: home, text: 'Home' },
  ];

  const navAdmin = [
    { icon: home, selectedIcon: home, text: 'Students & Admins Details' },
    { icon: edit, selectedIcon: edit, text: 'Enrollment Details' },
    { icon: edit, selectedIcon: edit, text: 'Course Details' },
  ];

  // Determine the nav array based on the type prop
  const nav = (() => {
    switch (type) {
      case 'stdudent':
        return navStudent;
      case 'admin':
        return navAdmin;
      default:
        return [];
    }
  })();

  const enlarge = { decrease: menu, enlarge: menu, text: 'Group Manager' };

  const [selected, setSelected] = useState(() => {
    const storedSelected = JSON.parse(localStorage.getItem('selectedSidebarItem'));
    return storedSelected !== null ? storedSelected : nav.findIndex((item) => item.text === 'Home');
  });

  useEffect(() => {
    localStorage.setItem('selectedSidebarItem', JSON.stringify(selected));
  }, [selected]);

  const handleItemClick = (index, event) => {
    event.preventDefault();
    localStorage.setItem('selectedSidebarItem', JSON.stringify(index));
    setSelected(index);

    if (type === 'student') {
      if (selected !== index) {
        if (index === navStudent.findIndex((item) => item.text === 'home')) {
          navigate(`/studentHome`);
        }
      }
    } else if (type === 'admin') {
      if (selected !== index) {
        if (index === navAdmin.findIndex((item) => item.text === 'Students & Admins Details')) {
          navigate('/users');
        } else if (index === navAdmin.findIndex((item) => item.text === 'Enrollment Details')) {
          navigate(`/enrollment`);
        } else if (index === navAdmin.findIndex((item) => item.text === 'Course Details')) {
          navigate(`/course`);
        }
      }
    }
    
  };

  const handleEnlargeClick = () => {
    setEnlarge(!isEnlarge);
    onValueChange(!isEnlarge);
  };


  // ... other navigation definitions (unchanged)

  const handleLogout = async () => {
    const confirmLogout = await Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You'll be redirected to the login page.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#5a7d59",
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
      customClass: {
        popup: 'bg-backgroundGreen text-sidebarGreen', // Use Tailwind CSS class directly
      },
    });

    if (confirmLogout.isConfirmed) {
      try {
        // Implement backend logout logic if necessary (e.g., API call to invalidate token)
        localStorage.removeItem('token'); // Remove token from local storage
        localStorage.removeItem('email'); // Remove email from local storage
        navigate('/'); // Redirect to login page
      } catch (error) {
        console.error('Error during logout:', error);
        Swal.fire(
          'Logout Unsuccessful', 
          'An error occurred while logging out. Please try again.', 
          'error');
      }
    }
  
  };

  return (
    <div id="app" className="min-h-screen fixed bg-[#405bd1] lg:max-w-[15%] text-left">
      <header className="pos-r h-screen inline-flex flex-col justify-between bg-[#405bd1] p-6">
      <nav className=" inline-flex flex-col space-y-2">
      <button
        className="h-8 w-8 p-1 mb-8 hidden sm:block bg-[#405bd1] text-[#405bd1] rounded-lg mx-auto hover:border-gray-300"
        onClick={handleEnlargeClick}
      >
        <img src={isEnlarge ? enlarge.decrease : enlarge.enlarge} alt="Enlarge/Decrease" />
      </button>
      {type === "admin" && navAdmin.map((link, index) => (
        <div key={index} className="relative">
          <a
            className={`flex items-center text-white py-2 cursor-pointer hover:bg- hover:text-[#405bd1]  ${
              isEnlarge ? 'pl-2 pr-6 rounded-lg' : 'px-2 rounded-full'
              } ${selected === index ? 'bg-[#5f75d6] text-[#405bd1]' : ''}`}
            onClick={(event) => handleItemClick(index, event)}
          >
            <img
              src={isEnlarge ? link.selectedIcon : link.icon}
              alt={link.text}
              className={`w-8 h-8 p-1 ${isEnlarge ? 'mr-4' : ''}`}
            />
            {isEnlarge && <span className="font-medium select-none">{link.text}</span>}
            {link.text === 'Video' && link.image && (
              <img
                src={link.image}
                alt="Video"
                className="w-8 h-8 p-1 ml-2 rounded-full"
              />
            )}
          </a>
        </div>
      ))}
    </nav>
        <footer className="inline-flex flex-col justify-end">
        <button className="py-2 px-2 flex items-center text-white hover:bg-[#5f75d6] rounded-lg text-center font-bold text-lg" onClick={handleLogout}>
        <LogoutOutlined style={{ marginRight: '10px' }} />
        Logout
      </button>
        </footer>
      </header>
    </div>
  );
};

export default Sidebar;
