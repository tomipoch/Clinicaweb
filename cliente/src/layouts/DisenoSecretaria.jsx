import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

function DisenoSecretaria() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-AED2FF">
      {/* Header en la parte superior sin espacios en blanco */}
      <NavBar />
      {/* Contenido principal a la derecha del header */}
      <main className="flex-1 bg-E4F1FF p-5"> {/* Cambiado el color del fondo y agregado más padding */}
        <Outlet />
      </main>
    </div>
  );
}

export default DisenoSecretaria;
