import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

const ListaCitas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET cuando el componente se monta
    axiosInstance
      .get("/ver-citas") // Reemplaza con la URL correcta de tu API
      .then((response) => {
        console.log("respuesta", response.data);
        setCitas(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las citas:", error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col mt-1">
      <h1 className="text-3xl text-blue-500 font-bold mb-8">Lista de Citas</h1>
      <div className="overflow-x-auto rounded-2xl shadow-2xl shadow-blue-200">
        <table className="min-w-full leading-normal bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Rut
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Paciente
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Fecha y Hora
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Médico
              </th>
            </tr>
          </thead>
          <tbody>
            {citas.length > 0 ? (
              citas.map((cita, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cita.rut}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cita.paciente}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cita.fechaHora}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cita.medico}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-5 border-b border-gray-200 bg-white text-center"
                >
                  No hay citas programadas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaCitas;
