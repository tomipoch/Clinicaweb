import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";

const ConsultaHistorialPaciente = () => {
  const [rutPaciente, setRutPaciente] = useState("");
  const [historial, setHistorial] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Hacer una solicitud GET al servidor con el RUT del paciente
    // Limpia el campo de entrada del RUT
    const dataToSend = {
      rutPaciente: rutPaciente,
    };
    //console.log("dataToSend", dataToSend);
    axiosInstance
      .post("/historial", dataToSend)
      .then((response) => {
        const historialMedico = response.data.rows.map((item) => ({
          id: item[0], // Si necesitas el ID para algo
          rut: item[1], // Si necesitas el RUT para algo
          // otroDato: item[2], // Otros datos si los hay y los necesitas
          fecha: item[3],
          diagnostico: item[4],
          medicamento: item[5],
          medico: item[6],
        }));
        console.log("Historial Médico:", historialMedico);
        setHistorial(historialMedico); // Actualiza el estado con los datos recibidos
      })
      .catch((error) => {
        console.error("Error al obtener el historial médico:", error);
      });
    // Limpia el campo de entrada del RUT
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen mt-12">
      <h1 className="text-3xl text-blue-500 font-bold mb-4">
        Historial Médico
      </h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-lg shadow-blue-200">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-blue-500">
              Ingrese el RUT del paciente:
            </label>
            <input
              type="text"
              value={rutPaciente}
              onChange={(e) => setRutPaciente(e.target.value)}
              className="w-full p-2 border rounded-md text-blue-500 bg-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Consultar Historial
          </button>
        </form>
      </div>

      <div className="mt-8">
        {historial.length > 0 ? (
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Diagnóstico</th>
                <th className="px-4 py-2">Medicamento</th>
                <th className="px-4 py-2">Médico</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-2">{item.fecha}</td>
                  <td className="px-4 py-2">{item.diagnostico}</td>
                  <td className="px-4 py-2">{item.medicamento}</td>
                  <td className="px-4 py-2">{item.medico}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-blue-500 mt-4">
            No hay registros en el historial médico.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConsultaHistorialPaciente;
