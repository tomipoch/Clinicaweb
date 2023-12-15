import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

function handleEdit(contactId) {
  console.log("Editar contacto con ID:", contactId);
}

function handleSelect(contactId) {
  console.log("Seleccionar contacto con ID:", contactId);
}

const Pacientes = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/holamundo")
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
      <h1 className="text-3xl text-blue-500 font-bold mb-8">Lista de Pacientes</h1>
      <div className="w-full  rounded-2xl overflow-x-auto">
        <table className="w-full  rounded-2xl table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                RUT
              </th>
              <th className="px-6 py-3 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Apellido Paterno
              </th>
              <th className="px-6 py-3 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Apellido Materno
              </th>
              <th className="px-6 py-3 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.rut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.paternalLastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.maternalLastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleEdit(contact.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleSelect(contact.id)}
                      className="text-red-600 hover:text-red-900 ml-4"
                    >
                      Seleccionar
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
                  No hay pacientes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pacientes;
