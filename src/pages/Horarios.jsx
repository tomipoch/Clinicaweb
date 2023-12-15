import React, { useState, useEffect } from "react";

const Horarios = () => {
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Horarios Disponibles</h1>
      {/* Aquí iría el calendario o lista de horarios disponibles */}
      {horarios.map((horario) => (
        <div key={horario.id}>{/* Contenido de cada horario */}</div>
      ))}
    </div>
  );
};

export default Horarios;
