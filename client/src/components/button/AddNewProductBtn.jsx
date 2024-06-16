import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddNewProductBtn() {
  const navigate = useNavigate(); 
  const addproducts= () => {
    navigate('/addnewproduct');
  };
  return (
    <div className='inline-flex ml-[80%] w-[80%] h-[3%] mt-24'>
      <button className="z-10 w-[100%] text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " onClick={addproducts}>
          Add New Product
      </button>
      </div>
  )
}
