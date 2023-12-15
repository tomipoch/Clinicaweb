import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

function DisenoMedico() {
  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      {/* Header en la parte superior sin espacios en blanco */}
      <NavBar />
      {/* Contenido principal a la derecha del header */}
      <main className="flex-grow justify-center p-4 bg-green-300"> {/* Corregido el color del fondo */}
        <Outlet />
      </main>
    </div>
  );
}

export default DisenoMedico;
