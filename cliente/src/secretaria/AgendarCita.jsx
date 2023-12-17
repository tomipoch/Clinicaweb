import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

const AgendarCita = () => {
  const [rutPaciente, setRutPaciente] = useState("");
  const [selectedMedico, setSelectedMedico] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/medicos")
      .then((response) => {
        // Asegúrate de que el backend envía un array de objetos con las propiedades idMedico y nombreCompleto
        setMedicos(
          response.data.map((medico) => ({
            idMedico: medico.idMedico, // Suponiendo que el backend envía COD_MEDICO
            nombreCompleto: medico.nombreCompleto,
          }))
        );
      })
      .catch((error) => {
        console.error("Error al obtener la lista de médicos:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Enviar los datos de la cita al backend usando Axios
    const dataToSend = {
      rutPaciente: rutPaciente,
      idMedico: selectedMedico, // Asegúrate de que este sea el COD_MEDICO del médico seleccionado
      fecha: fecha,
      hora: hora,
    };

    axiosInstance
      .post("/agendar-cita", dataToSend) // Ajusta la ruta del backend según tus necesidades
      .then((response) => {
        // Manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito
        console.log("Cita agendada con éxito");
        // Limpiar el formulario
        setRutPaciente("");
        setSelectedMedico("");
        setFecha("");
        setHora("");
      })
      .catch((error) => {
        console.error("Error al agendar la cita:", error);
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
        <h2 className="text-blue-500 font-bold text-3xl mb-5">Agendar Citas</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-between max-w-5xl mx-auto"
        >
          {/* Columna 1 */}
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
            {renderInput(
              "Rut Paciente:",
              rutPaciente,
              setRutPaciente,
              "text",
              true
            )}
          </div>
          
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
            <div className="mb-3">
              <label className="block text-blue-500 font-semibold">
                Médico
              </label>
              <select
                value={selectedMedico}
                onChange={(e) => setSelectedMedico(e.target.value)}
                className="bg-blue-100 text-blue-500 rounded-md p-2 w-full"
              >
                <option value="">Seleccione un médico</option>
                {medicos.map((medico) => (
                  <option key={medico.idMedico} value={medico.idMedico}>
                    {medico.nombreCompleto}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Columna 3 */}
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            {renderInput("Fecha:", fecha, setFecha, "date", true)}
            {renderInput("Hora:", hora, setHora, "time", true)}
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md p-2 w-full"
            >
            Agendar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgendarCita;
