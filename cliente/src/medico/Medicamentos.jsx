import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

function handleEdit(contactId) {
  console.log("Editar contacto con ID:", contactId);
}

function handleSelect(contactId) {
  console.log("Seleccionar contacto con ID:", contactId);
}

const Medicamentos = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/medicamentos")
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
      <h1 className="text-3xl text-blue-500 font-bold mb-8">Medicamentos</h1>
      <div className="w-full  rounded-2xl shadow-xl shadow-blue-300 overflow-x-auto">
        <table className="w-full  rounded-2xl table-auto">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Código de medicamento
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Nombre del medicamento
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Disponibilidad
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-500 text-left text-xs font-semibold text-white bg-blue-500 tracking-wider">
                Valor
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
                    {contact.codigodemedicamento}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contact.nombredelmedicamento}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contact.disponibilidad}
                  </td>
                  <td className="px-6 py-4 border-b border-blue-100 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contact.valor}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
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
