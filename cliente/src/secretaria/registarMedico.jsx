import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";

const RegistrarMedico = () => {
  const [rutPersonal, setRutPersonal] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [contacto, setContacto] = useState(0);
  const [codEspecialidad, setCodEspecialidad] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Crear un objeto con los datos del médico
    const medicoData = {
      rutPersonal,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      contacto,
      codEspecialidad,
    };

    // Enviar los datos del médico al backend usando Axios
    axiosInstance
      .post("/registrar/medico", medicoData)
      .then((response) => {
        console.log("Médico registrado con éxito");
        // Limpiar el formulario
        setRutPersonal(0);
        setNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setContacto(0);
        setCodEspecialidad(0);
      })
      .catch((error) => {
        console.error("Error al registrar el médico:", error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen mt-12">
    <div className="container mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-md shadow-2xl shadow-blue-200"
      >
        <div className="mb-4 text-center">
          <h1 className="text-3xl text-blue-500 font-bold mb-2">
            Formulario de Registro de Médico
          </h1>
        </div>
          <label className="block mb-4 text-blue-500">
            Rut Personal:
            <input
              type="number"
              value={rutPersonal}
              onChange={(e) => setRutPersonal(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            />
          </label>

          <label className="block mb-4 text-blue-500">
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            />
          </label>

          <label className="block mb-4 text-blue-500">
            Apellido Paterno:
            <input
              type="text"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            />
          </label>

          <label className="block mb-4 text-blue-500">
            Apellido Materno:
            <input
              type="text"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            />
          </label>

          <label className="block mb-4 text-blue-500">
            Contacto:
            <input
              type="number"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            />
          </label>

          <label className="block mb-4 text-blue-500">
            Código de Especialidad:
            <input
              type="number"
              value={codEspecialidad}
              onChange={(e) => setCodEspecialidad(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md"
          >
            Registrar Médico
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarMedico;
