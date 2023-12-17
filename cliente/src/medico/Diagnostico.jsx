import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

const Diagnostico = () => {
  const [rutPaciente, setRutPaciente] = useState("");
  const [codMedico, setCodMedico] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [fecha, setFecha] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [selectedMedicamento, setSelectedMedicamento] = useState("");
  const [diagnosticoEnviado, setDiagnosticoEnviado] = useState(false); // Estado para controlar si el diagnóstico se ha enviado con éxito

  useEffect(() => {
    axiosInstance
      .get("/medicos")
      .then((response) => {
        console.log("medicos", response.data);
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

    axiosInstance
      .get("/medicamentos")
      .then((response) => {
        if (Array.isArray(response.data)) {
          // Reemplaza valores null y da formato a los datos
          const formattedData = response.data.map(
            ([id, codigo = "", nombre, disponibilidad]) => ({
              id,
              codigo: codigo || "No disponible", // Reemplaza null por 'No disponible' o por una cadena vacía si prefieres
              nombre,
              disponibilidad,
            })
          );
          setMedicamentos(formattedData);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la lista de medicamentos:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Enviar los datos de diagnóstico al backend usando Axios
    const dataToSend = {
      rutPaciente,
      codMedico,
      descripcion,
      fecha,
      codMedicamento: selectedMedicamento,
    };
    axiosInstance
      .post("/diagnostico", dataToSend)
      .then((response) => {
        console.log("Diagnóstico enviado con éxito");
      })
      .catch((error) => {
        console.error("Error al enviar el diagnóstico:", error);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen mt-12">
      <h1 className="text-3xl text-blue-500 font-bold mb-2">
        Formulario de Diagnóstico
      </h1>
      <div className="container mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-8 rounded-md shadow-2xl shadow-blue-200"
        >
          <label className="block mb-4 text-blue-500">
            RUT Paciente:
            <input
              type="text"
              value={rutPaciente}
              onChange={(e) => setRutPaciente(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            />
          </label>

          <label className="block mb-4 text-blue-500">
            Médico:
            <select
              value={codMedico}
              onChange={(e) => setCodMedico(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            >
              <option value="">Seleccione un médico</option>
              {medicos.map((medico) => (
                <option key={medico.idMedico} value={medico.idMedico}>
                  {medico.nombreCompleto}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4 text-blue-500">
            Descripción de diagnóstico:
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            ></textarea>
          </label>

          <label className="block mb-4 text-blue-500">
            Fecha:
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-blue-100"
              required
            />
          </label>

          <label className="block mb-4 text-blue-500">
            Medicamento:
            <select
              value={selectedMedicamento}
              onChange={(e) => setSelectedMedicamento(e.target.value)}
              className="bg-blue-100 text-blue-500 rounded-md p-2 w-full mt-1 mb-8"
              required
            >
              <option value="">Seleccione un medicamento</option>
              {medicamentos.map((medicamento) => (
                <option key={medicamento.id} value={medicamento.id}>
                  {medicamento.nombre}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md"
          >
            Enviar Información
          </button>
        </form>
      </div>
    </div>
  );
};

export default Diagnostico;
