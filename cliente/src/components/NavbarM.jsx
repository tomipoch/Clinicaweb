import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBarM = () => {

  return (
    <div className='flex justify-between items-center w-full h-20 px-12 fixed top-2 '>
      <h1 className='text-3xl font-bold text-blue-500'>Médico</h1>
      <nav>
        <ul className='flex'>
          <li className='p-4 hover:bg-blue-200 transition duration-300 rounded-2xl'>
            <Link to="/medico" className='h-full w-full flex items-center hover:text-white'>Inicio</Link>
          </li>
          <li className='p-4 hover:bg-blue-200 transition duration-300 rounded-2xl'>
            <Link to="diagnostico" className='h-full w-full flex items-center hover:text-white'>Diagnostico</Link>
          </li>
          <li className='p-4 hover:bg-blue-200 transition duration-300 rounded-2xl'>
            <Link to="medicamentos" className='hover:text-white'>Medicamentos</Link>
          </li>
     
        </ul>
      </nav>
    </div>
  );
};

export default NavBarM;
