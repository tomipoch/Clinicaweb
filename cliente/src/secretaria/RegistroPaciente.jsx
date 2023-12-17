import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";

const RegistroPaciente = () => {
  const [nombrePaciente, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [rutPaciente, setRut] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [contacto, setContacto] = useState("");

  const handleRegistro = () => {
    const pacienteData = {
      rutPaciente,
      nombrePaciente,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      contacto,
      direccion,
    };
    console.log("pacientData", pacienteData);
    axiosInstance
      .post("/secretaria/pacientes", pacienteData)
      .then((response) => {
        console.log("Registro exitoso:", response.data);
        // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
      })
      .catch((error) => {
        console.error("Error al registrar paciente:", error);
        // Puedes mostrar un mensaje de error al usuario aquí
      });
  };

  const renderInput = (
    label,
    value,
    onChange,
    type = "text",
    required = false
  ) => (
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

  return (
    <div className="mt-20">
      <div className="bg-white rounded-xl flex flex-col items-center justify-center w-3/5 mx-auto p-14 shadow-2xl shadow-blue-200 mt-4 mb-4">
        <h2 className="text-blue-500 text-3xl font-bold mb-4">
          Formulario de Registro de Paciente
        </h2>
        <div className="flex justify-between max-w-2xl mx-auto">
          <div className="flex-1 m-2">
            <form className="flex flex-col items-center">
              {renderInput("Nombre", nombrePaciente, setNombre, "text", true)}
              {renderInput(
                "Apellido Paterno",
                apellidoPaterno,
                setApellidoPaterno,
                "text",
                true
              )}
              {renderInput(
                "Apellido Materno",
                apellidoMaterno,
                setApellidoMaterno,
                "text",
                true
              )}
              {renderInput("RUT", rutPaciente, setRut, "text", true)}
            </form>
          </div>
          <div className="flex-1 m-2">
            <form className="flex flex-col items-center">
              {renderInput(
                "Fecha de Nacimiento",
                fechaNacimiento,
                setFechaNacimiento,
                "date"
              )}
              {renderInput("Email", email, setEmail, "email", true)}
              {renderInput("Dirección", direccion, setDireccion, "text", true)}
              {renderInput("Contacto", contacto, setContacto, "tel", true)}
            </form>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="mt-4 px-8 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-green active:bg-green-800"
            onClick={handleRegistro}
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistroPaciente;
