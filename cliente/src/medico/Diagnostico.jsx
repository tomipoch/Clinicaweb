// src/App.jsx
import React, { useState } from 'react';

function HistorialPaciente() {
  const [patientInfo, setPatientInfo] = useState({
    rut: '',
    medicalRut: '',
    diagnosis: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Patient Info:', patientInfo);
    // Puedes enviar la información a tu backend o hacer lo que necesites aquí
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen mt-1">
      <h1 className="text-3xl text-blue-500 font-bold mb-2">Formulario de Diagnostico</h1>
    <div className="container mx-auto mt-10 ">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-2xl shadow-blue-300">
        <label className="block mb-4 text-blue-500">
          RUT Paciente:
          <input
            type="text"
            name="rut"
            value={patientInfo.rut}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md bg-blue-100" // Aquí se agregó la clase bg-blue-200
            required
          />
        </label>

        <label className="block mb- text-blue-500">
          RUT Médico:
          <input
            type="text"
            name="medicalRut"
            value={patientInfo.medicalRut}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md bg-blue-100" // Aquí se agregó la clase bg-blue-200
            required
          />
        </label>

        <label className="block mb-4 text-blue-500">
          Descripción de diagnóstico:
          <textarea
            name="diagnosis"
            value={patientInfo.diagnosis}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md bg-blue-100" // Aquí se agregó la clase bg-blue-200
            required
          ></textarea>
        </label>

        <label className="block mb-4 text-blue-500">
          Fecha:
          <input
            type="date"
            name="date"
            value={patientInfo.date}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md bg-blue-100" // Aquí se agregó la clase bg-blue-200
            required
          />
        </label>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Enviar Información
        </button>
      </form>
    </div>
    </div>
  );
}

export default HistorialPaciente;