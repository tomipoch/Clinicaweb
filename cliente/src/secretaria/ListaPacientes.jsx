import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

// Función que no hace nada
function handleEdit(contactId) {
  console.log("Editar contacto con ID:", contactId);
}

// Función que no hace nada
function handleSelect(contactId) {
  console.log("Seleccionar contacto con ID:", contactId);
}

const ListaPacientes = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET cuando el componente se monta

    axiosInstance
      .get("/secretaria/pacientes")
      .then((response) => {
        console.log("response", response.data);
        // Asegúrate de que la respuesta sea un arreglo
        if (Array.isArray(response.data)) {
          setContacts(response.data);
        } else {
          // Si no, manejar la ausencia de un arreglo
          console.error("La respuesta no es un arreglo");
          setContacts([]); // Puedes establecer un estado vacío o manejar como veas conveniente
        }
      })
      .catch((error) => {
        // Manejar el error
        console.error("Error al obtener datos:", error);
        setContacts([]); // En caso de error, establece un arreglo vacío
      });
  }, []);

  function handleEdit(contactId) {
    // Abre un modal o redirige a la página de edición pasando el ID del paciente
    console.log("Editar contacto con ID:", contactId);
    // Puedes usar una biblioteca de modales o React Router para implementar esta funcionalidad.
  }

  function handleSelect(contactId) {
    // Actualiza el estado del paciente seleccionado
    console.log("Seleccionar contacto con ID:", contactId);
    // Puedes usar un estado de React para almacenar el paciente seleccionado.
  }

  function handleDelete(contactId) {
    // Realiza una solicitud DELETE al servidor para eliminar el paciente con el ID contactId
    const rut = contacts[contactId][0];
    // Luego de eliminarlo con éxito, puedes actualizar la lista de pacientes
    axiosInstance
      .delete(`/secretaria/pacientes/`, { data: { rut: rut } })
      .then((response) => {
        // Actualiza la lista de pacientes después de la eliminación
        const updatedContacts = contacts.filter(
          (contact, index) => index !== contactId
        );
        setContacts(updatedContacts);
      })
      .catch((error) => {
        console.error("Error al eliminar paciente:", error);
        // Maneja los errores de eliminación aquí
      });
  }

  return (
    <div className="container mx-auto mt-20">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              RUT
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Paternal Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Maternal Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{contact[0]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{contact[1]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{contact[2]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{contact[3]}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(contact[4]).toLocaleDateString("es-ES")}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">{contact[5]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{contact[6]}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    handleEdit(index);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleSelect(index);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Select
                </button>
                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                  className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPacientes;
