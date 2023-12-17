import React from "react";
import { Link } from "react-router-dom";

const PanelMedico = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="py-20 px-16 rounded-xl shadow-2xl shadow-blue-200 bg-white bg-clip-border">
        <h1 className="text-3xl font-bold mb-14 text-blue-500 text-center">
          Resumen General
        </h1>
        <div className="flex flex-row gap-8 justify-center">
          <Link to="citas-medico">
            <button className="text-2xl bg-blue-500 shadow-blue-300 shadow-xl hover:bg-blue-700 text-white font-semibold rounded-xl py-12 px-12">
              Ir a Citas Medicas
            </button>
          </Link>

          <Link to="diagnostico">
            <button className="text-2xl bg-blue-600 shadow-blue-300 shadow-xl hover:bg-blue-700 text-white font-semibold rounded-xl py-12 px-12">
              Ir a Diagnosticos
            </button>
          </Link>

          <Link to="medicamentos">
            <button className="text-2xl bg-blue-500 shadow-blue-300 shadow-xl hover:bg-blue-700 text-white font-semibold rounded-xl py-12 px-12">
              Ir a Medicamentos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PanelMedico;
