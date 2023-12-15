//App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import DiseñoSecretaria from "./layouts/DisenoSecretaria";
import PanelControl from "./pages/PanelControl";
import Citas from "./pages/Citas";
import Pacientes from "./pages/Pacientes";
import PanelCitas from "./pages/PanelCitas";
import AgendarCita from "./pages/AgendarCita";
import PanelPacientes from "./pages/PanelPacientes";
import DetalleDePaciente from "./pages/DetalleDePaciente";
import RegistroPaciente from "./pages/RegistroPaciente";
import Horarios from "./pages/Horarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<DiseñoSecretaria />}>
          <Route index element={<PanelControl />} />
          <Route path="citas" element={<PanelCitas />} />
          <Route path="citas/listado" element={<Citas />} />
          <Route path="citas/agendar" element={<AgendarCita />} />
          <Route path="pacientes" element={<PanelPacientes />} />
          <Route path="pacientes/listado" element={<Pacientes />} />
          <Route path="pacientes/registro" element={<RegistroPaciente />} />
          <Route path="paciente/:id" element={<DetalleDePaciente />} />
          <Route path="horarios" element={<Horarios />} />
        </Route>



        {/* Layout Medico */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
