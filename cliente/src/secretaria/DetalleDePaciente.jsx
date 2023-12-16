import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetalleDePaciente = () => {
  const [paciente, setPaciente] = useState(null);
  const { id } = useParams();

  useEffect(() => {}, [id]);

  if (!paciente) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Detalle de Paciente</h1>
      {/* Aquí iría el contenido del paciente, como su nombre, historial médico, etc. */}
    </div>
  );
};

export default DetalleDePaciente;
