import React from "react";
import NavBarM from "../components/NavbarM.jsx";
import { Outlet } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
function DisenoMedico() {
  const handleLogout = () => {
    axiosInstance
      .post("/api/logout") // Reemplaza con la URL correcta de tu API para cerrar sesión
      .then((response) => {
        // Maneja la respuesta del servidor (por ejemplo, redirige al inicio de sesión)
        if (response.status === 200) {
          // Redirige al usuario a la página de inicio de sesión o a donde desees
          window.location.href = "/login";
        } else {
          console.error("Error al cerrar sesión");
        }
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };
  return (
    <div className="w-full min-h-screen flex flex-col bg-AED2FF">
      {/* Header en la parte superior sin espacios en blanco */}
      <NavBarM />
      {/* Contenido principal a la derecha del header */}
      <main className="flex-1 bg-E4F1FF p-5">
        {" "}
        {/* Cambiado el color del fondo y agregado más padding */}
        <Outlet />
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Cerrar Sesión
        </button>
      </main>
    </div>
  );
}

export default DisenoMedico;
