import React from "react";
import { Link } from "react-router-dom";

function PanelControl() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="py-20 px-16 rounded-xl shadow-blue-300 shadow-2xl bg-white bg-clip-border">
        <h1 className="text-3xl font-bold mb-14 text-blue-500 text-center">Resumen General</h1>
        <div className="flex items-center justify-center space-x-8">
          <Link to="/pacientes">
            <button className="text-2xl bg-blue-500 shadow-blue-300 shadow-xl hover:bg-blue-700 text-white font-semibold rounded-xl py-12 px-12">
              Ir a Pacientes
            </button>
          </Link>

          <Link to="/citas">
            <button className="text-2xl bg-green-500 shadow-green-300 shadow-xl hover:bg-green-700 text-white font-semibold rounded-xl py-12 px-12">
              Ir a Citas Médicas
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PanelControl;
