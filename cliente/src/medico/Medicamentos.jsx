import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/medicamentos")
      .then((response) => {
        if (Array.isArray(response.data)) {
          // Reemplaza valores null y da formato a los datos
          const formattedData = response.data.map(
            ([id, codigo = "", nombre, disponibilidad]) => ({
              id,
              codigo: codigo || "No disponible",
              nombre,
              disponibilidad,
            })
          );
          setMedicamentos(formattedData);
        } else {
          console.error("La respuesta no es un arreglo");
          setMedicamentos([]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setMedicamentos([]);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen mt-1">
      <h1 className="text-3xl text-blue-500 font-bold mb-8">Medicamentos</h1>
      <div className="w-full rounded-2xl shadow-2xl shadow-blue-200 overflow-x-auto">
        <table className="min-w-full leading-normal rouunded-2xl bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Código de medicamento
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Nombre del medicamento
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Disponibilidad
              </th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.length > 0 ? (
              medicamentos.map((medicamento) => (
                <tr key={medicamento.id}>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium bg-white text-blue-500">
                    {medicamento.id}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium bg-white text-blue-500">
                    {medicamento.nombre}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium bg-white text-blue-500">
                    {medicamento.disponibilidad}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 whitespace-nowrap text-center bg-white text-blue-500"
                >
                  No hay medicamentos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medicamentos;
