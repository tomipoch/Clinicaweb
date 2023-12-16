import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

const AgendarCita = () => {
  useEffect(() => {
    // Eliminé la carga de Google Fonts
  }, []);

  const [rutPaciente, setRutPaciente] = useState("");
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [apellidoPaternoPaciente, setApellidoPaternoPaciente] = useState("");
  const [apellidoMaternoPaciente, setApellidoMaternoPaciente] = useState("");
  const [contactoPaciente, setContactoPaciente] = useState("");
  const [selectedMedico, setSelectedMedico] = useState(""); // Estado para el médico seleccionado
  const [medicos, setMedicos] = useState([]); // Estado para la lista de médicos disponibles
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    // Obtener la lista de médicos disponibles al cargar el componente
    axiosInstance
      .get("/medicos") // Reemplaza con la ruta correcta para obtener médicos
      .then((response) => {
        setMedicos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de médicos:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega aquí la lógica para enviar los datos a tu servidor o realizar la acción correspondiente.
    console.log("Valores de los campos:");
    console.log("Rut Paciente:", rutPaciente, typeof rutPaciente);
    console.log("Nombre Paciente:", nombrePaciente, typeof nombrePaciente);
    console.log(
      "Apellido Paterno Paciente:",
      apellidoPaternoPaciente,
      typeof apellidoPaternoPaciente
    );
    console.log(
      "Apellido Materno Paciente:",
      apellidoMaternoPaciente,
      typeof apellidoMaternoPaciente
    );
    console.log(
      "Contacto Paciente:",
      contactoPaciente,
      typeof contactoPaciente
    );
    console.log("Médico Seleccionado:", selectedMedico, typeof selectedMedico);
    console.log("Fecha:", fecha, typeof fecha);
    console.log("Hora:", hora, typeof hora);
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
      <div className="bg-white rounded-xl flex flex-col items-center justify-center w-3/5 mx-auto p-14 shadow-md mt-4 mb-4">
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
            {renderInput(
              "Nombre Paciente:",
              nombrePaciente,
              setNombrePaciente,
              "text"
            )}
            {renderInput(
              "Apellido Paterno:",
              apellidoPaternoPaciente,
              setApellidoPaternoPaciente,
              "text"
            )}
            {renderInput(
              "Apellido Materno:",
              apellidoMaternoPaciente,
              setApellidoMaternoPaciente,
              "text"
            )}
            {renderInput(
              "Contacto Paciente:",
              contactoPaciente,
              setContactoPaciente,
              "text"
            )}
          </div>

          {/* Columna 2 */}
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
            <div className="mb-3">
              <label className="block text-blue-500 font-semibold">
                Médico
              </label>
              <select
                value={selectedMedico}
                onChange={(e) => setSelectedMedico(e.target.value)}
                className="bg-blue-100 text-blue-500 rounded-md p-2 w-full"
                required
              >
                <option value="">Seleccione un médico</option>
                {medicos.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nombre} {medico.apellido}
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-md p-2 w-full"
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
