import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

function handleEdit(contactId) {
  console.log("Editar contacto con ID:", contactId);
}

function handleSelect(contactId) {
  console.log("Seleccionar contacto con ID:", contactId);
}

const EquipoMedico = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/equipomedico")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setContacts(response.data);
        } else {
          console.error("La respuesta no es un arreglo");
          setContacts([]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setContacts([]);
      });
  }, []);


  return (
    <div className="flex flex-col justify-center items-center h-screen mt-1">
      <h1 className="text-3xl text-blue-500 font-bold mb-8">Equipo Médico</h1>
      <div className="w-full  rounded-2xl overflow-x-auto">
        <table className="w-full  rounded-2xl table-auto">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Código del equipo
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Nombre del Equipo
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Disponibilidad
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cita.id}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contact.codigodelequipo}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contact.nombredelequipo}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contact.disponibilidad}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    <button className="text-blue-500 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 rounded-md px-2 py-1">
                      Editar
                    </button>
                    <button className="text-red-500 hover:text-red-800 ml-4 bg-blue-100 hover:bg-blue-200 rounded-md px-2 py-1">
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                >
                  No hay equipo medico registrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipoMedico;
