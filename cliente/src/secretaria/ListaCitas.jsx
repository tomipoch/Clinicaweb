import React, { useState, useEffect } from "react";

const ListaCitas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    setCitas([
      {
        id: 1,
        paciente: "Juan",
        fechaHora: "lunes",
        medico: "Juanito",
        estado: "Pendiente",
      },
    ]);
    // Sustituye con la URL real de tu API
    // axios.get('/api/citas')
    //   .then(response => {
    //     // Asumimos que la respuesta de la API es un arreglo de citas
    //     setCitas(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Hubo un error al obtener las citas:', error);
    //   });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col mt-1">
      <h1 className="text-3xl text-blue-500 font-bold mb-8">Lista de Pacientes</h1>
      <div className="overflow-x-auto rounded-2xl">
        <table className="min-w-full leading-normal bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                ID
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
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Estado
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {citas.length > 0 ? (
              citas.map((cita) => (
                <tr key={cita.id}>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cita.id}
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
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cita.estado}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900 ml-4">
                      Cancelar
                    </button>
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