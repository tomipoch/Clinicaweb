import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='flex justify-between items-center w-full h-20 px-12 text-49108B fixed top-2 bg-AED2FF'>
      <h1 className='text-4xl font-bold text-blue-500'>SECRETARIA</h1>
      <nav>
        <ul className='flex space-x-10'>
          <li className='hover:blue-500 transition duration-300'>
            <Link to="/" className='flex items-center h-full px-4 hover:text-white'>
              Inicio
            </Link>
          </li>
          <li className='hover:blue-500 transition duration-300'>
            <Link to="/pacientes" className='flex items-center h-full px-4 hover:text-white'>
              Pacientes
            </Link>
          </li>
          <li className='hover:blue-500 transition duration-300'>
            <Link to="/citas" className='hover:text-white flex items-center h-full px-6'>
              Citas
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
