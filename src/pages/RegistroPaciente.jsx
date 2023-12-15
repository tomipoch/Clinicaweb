import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RegistroPaciente = () => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [rut, setRut] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [contacto, setContacto] = useState("");

  const handleRegistro = () => {
    // Handle registration logic, such as sending data to a server
    console.log("Nombre:", nombre);
    console.log("Apellido Paterno:", apellidoPaterno);
    console.log("Apellido Materno:", apellidoMaterno);
    console.log("RUT:", rut);
    console.log("Fecha de Nacimiento:", fechaNacimiento);
    console.log("Email:", email);
    console.log("Dirección:", direccion);
    console.log("Contacto:", contacto);
  };

  return (
    <div className="mt-20"> {/* Ajusté el margen superior para evitar que pase por encima del header */}
      <div className="bg-white rounded-xl flex flex-col items-center justify-center w-3/5 mx-auto p-14 shadow-md mt-4 mb-4">
      <h2 className="text-blue-500 text-3xl font-bold mb-4">
        Formulario de Registro de Paciente
      </h2>
      <div className="flex justify-between max-w-2xl mx-auto">
        <div className="flex-1 m-2">
          <form className="flex flex-col items-center">
            {renderInput("Nombre", nombre, setNombre, "text", true)}
            {renderInput("Apellido Paterno", apellidoPaterno, setApellidoPaterno, "text", true)}
            {renderInput("Apellido Materno", apellidoMaterno, setApellidoMaterno, "text", true)}
            {renderInput("RUT", rut, setRut, "text", true)}
          </form>
        </div>
        <div className="flex-1 m-2">
          <form className="flex flex-col items-center">
            {renderInput("Fecha de Nacimiento", fechaNacimiento, setFechaNacimiento, "date")}
            {renderInput("Email", email, setEmail, "email", true)}
            {renderInput("Dirección", direccion, setDireccion, "text", true)}
            {renderInput("Contacto", contacto, setContacto, "text", true)}
          </form>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="mt-4 px-8 py-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800"
          onClick={handleRegistro}
        >
          Registrar
        </button>
      </div>
    </div>
    </div>
  );
};

const renderInput = (label, value, onChange, type = "text", required = false) => (
  <div className="mb-3">
    <label className="block text-blue-500 font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-blue-100 text-blue-500 rounded-md p-2 w-full"
      required={required}
    />
  </div>
);

export default RegistroPaciente;
