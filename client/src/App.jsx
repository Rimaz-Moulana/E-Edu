import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';



import CourseDetail from './components/CourseDetails/CourseDetails.jsx';
import AddUser from './pages/Admin/AddUser.jsx';
import AllUsers from './pages/Admin/AdminDashboard.jsx';
import Course from './pages/Admin/CourseManagement.jsx';
import { default as Enroll, default as Enrollment } from './pages/Admin/EnrollmentManagement.jsx';
import { default as Login } from './pages/Auth/Login.jsx';
import Register from './pages/Auth/RegisterForm.jsx';
import Homepage from './pages/Student/HomePage.jsx';



import './App.css';


function App(){

  return (
    <BrowserRouter>
        <Routes>
              {/* <Route path='/text' element={<VideoToText />} /> */}
            {/* <Route path='/'  > */}
              <Route path='/login' element={<Login />} />
              {/* <Route path='/login' element={<Login />} />
              <Route path='/log' element={<Log />} /> */}
              <Route path='/register' element={<Register />} />
              <Route path="/" exact element={<Homepage />} />
              


             
              <Route path='/addUser' element={<AddUser />} />
              <Route path='/users' element={<AllUsers />} />
              <Route path='/course' element={<Course /> } />
              <Route path='/enrollment' element={<Enrollment /> } />
              <Route path='/course/:courseId' element={<CourseDetail />} />
              <Route path='/enroll' element={<Enroll />} />
          
             
        </Routes>
    </BrowserRouter>
  )
}

export default App;