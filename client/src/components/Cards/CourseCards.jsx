import React from 'react';

const CourseCard = ({ course, onCourseClick, onEnrollClick, loggedIn, enrollmentStatus }) => {
  const isEnrolled = enrollmentStatus[course._id] === 'enrolled';

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.title}</div>
        <p className="text-gray-700 text-base">{course.description}</p>
        <p className="text-blue-500 font-bold mt-4">${course.price}</p>
        <button
          className={`mt-4 w-full ${!loggedIn ? 'cursor-not-allowed opacity-50' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
          onClick={() => onCourseClick(course._id)}
          disabled={!loggedIn}
        >
          View Details
        </button>
        <button
          className={`mt-4 w-full ${!loggedIn || isEnrolled ? 'cursor-not-allowed opacity-50' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded`}
          onClick={() => onEnrollClick(course._id)}
          disabled={!loggedIn || isEnrolled}
        >
          {isEnrolled ? 'Request Done' : 'Enroll'}
        </button>
        {isEnrolled && <p className="text-green-500 mt-2">Request Done</p>}
      </div>
    </div>
  );
};

export default CourseCard;
