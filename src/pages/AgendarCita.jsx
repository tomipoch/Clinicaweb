import React, { useState, useEffect } from "react";

const AgendarCita = () => {
  useEffect(() => {
    // Eliminé la carga de Google Fonts
  }, []);

  const [rutPaciente, setRutPaciente] = useState("");
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [apellidoPaternoPaciente, setApellidoPaternoPaciente] = useState("");
  const [apellidoMaternoPaciente, setApellidoMaternoPaciente] = useState("");
  const [contactoPaciente, setContactoPaciente] = useState("");
  const [rutMedico, setRutMedico] = useState("");
  const [nombreMedico, setNombreMedico] = useState("");
  const [apellidoPaternoMedico, setApellidoPaternoMedico] = useState("");
  const [apellidoMaternoMedico, setApellidoMaternoMedico] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega aquí la lógica para enviar los datos a tu servidor o realizar la acción correspondiente.
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

  return (
    <div className="mt-20">
      <div className="bg-white rounded-xl flex flex-col items-center justify-center w-3/5 mx-auto p-14 shadow-md mt-4 mb-4">
        <h2 className="text-blue-500 font-bold text-3xl mb-5">Agendar Citas</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-between max-w-5xl mx-auto"
        >
          {/* Columna 1 */}
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
            {renderInput("Rut Paciente:", rutPaciente, setRutPaciente, "text", true)}
            {renderInput("Nombre Paciente:", nombrePaciente, setNombrePaciente, "text")}
            {renderInput("Apellido Paterno:",apellidoPaternoPaciente,setApellidoPaternoPaciente,"text")}
            {renderInput("Apellido Materno:",apellidoMaternoPaciente,setApellidoMaternoPaciente,"text",)}
            {renderInput("Contacto Paciente:",contactoPaciente,setContactoPaciente,"text")}
          </div>
  
          {/* Columna 2 */}
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
            {renderInput("Rut Médico:", rutMedico, setRutMedico, "text", true)}
            {renderInput("Nombre Médico:", nombreMedico, setNombreMedico, "text")}
            {renderInput("Apellido Paterno Medico:",apellidoPaternoMedico,setApellidoPaternoMedico,"text",)}
            {renderInput("Apellido Materno Medico:",apellidoMaternoMedico,setApellidoMaternoMedico,"text",)}
          </div>
  
          {/* Columna 3 */}
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            {renderInput("Fecha:", fecha, setFecha, "date", true)}
            {renderInput("Hora:", hora, setHora, "time", true)}
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-md p-2 w-full">
              Agendar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgendarCita;
