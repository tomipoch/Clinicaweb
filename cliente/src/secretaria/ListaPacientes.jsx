import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

const ListaPacientes = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/secretaria/pacientes")
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

  // Función para manejar la edición de un paciente
  function handleEdit(rutPaciente) {
    const pacienteParaEditar = contacts.find(
      (contact) => contact[0] === rutPaciente
    );
    setSelectedContact(pacienteParaEditar);
    setIsEditing(true);
  }

  // Función para cerrar el modal de edición o el estado de edición
  function handleCloseEdit() {
    setIsEditing(false);
  }

  // Función para actualizar los datos de un paciente
  function handleUpdateContact(updatedData) {
    axiosInstance
      .put(`/secretaria/paciente/${updatedData.rut}`, updatedData)
      .then((response) => {
        const updatedContacts = contacts.map((contact) =>
          contact[0] === updatedData.rut ? updatedData : contact
        );
        setContacts(updatedContacts);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error al actualizar el paciente:", error);
      });
  }

  // Función para eliminar un paciente
  function handleDelete(contactIndex) {
    const rut = contacts[contactIndex][0];
    axiosInstance
      .delete(`/secretaria/pacientes/`, { data: { rut: rut } })
      .then(() => {
        const updatedContacts = contacts.filter(
          (_, index) => index !== contactIndex
        );
        setContacts(updatedContacts);
      })
      .catch((error) => {
        console.error("Error al eliminar paciente:", error);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col mt-1">
      <h1 className="text-3xl text-blue-500 font-bold mb-8">Lista de Pacientes</h1>
    <div className="overflow-x-auto rounded-2xl shadow-2xl shadow-blue-200">
      <table className="min-w-full leading-normal bg-white border border-gray-200">
        <thead className="bg-blue-500">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              RUT
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              apellido Paterno
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              apellido Materno
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Fecha Nacimiento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Contacto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Direccion
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td className="px-6 text-blue-500 py-4 whitespace-nowrap">
                {contact[0]}
              </td>
              <td className="px-6 py-4 text-blue-500 whitespace-nowrap">
                {contact[1]}
              </td>
              <td className="px-6 py-4 text-blue-500 whitespace-nowrap">
                {contact[2]}
              </td>
              <td className="px-6 py-4 text-blue-500 whitespace-nowrap">
                {contact[3]}
              </td>
              <td className="px-6 py-4 text-blue-500 whitespace-nowrap">
                {new Date(contact[4]).toLocaleDateString("es-ES")}
              </td>

              <td className="px-6 py-4 text-blue-500 whitespace-nowrap">
                {contact[5]}
              </td>
              <td className="px-6 py-4 text-blue-500 whitespace-nowrap">
                {contact[6]}
              </td>
              <td className="px-6 py-4 text-blue-500 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(contact[0])} // Asumiendo que contact[0] es el RUT del paciente
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                  className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ListaPacientes;
