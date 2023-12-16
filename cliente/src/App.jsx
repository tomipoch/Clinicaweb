//App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// General
import Login from "./layouts/login";
import DisenoSecretaria from "./layouts/DisenoSecretaria";
import DisenoMedico from "./layouts/DisenoMedico";

// Secretaria
import PanelControl from "./secretaria/PanelControl";
import ListaCitas from "./secretaria/ListaCitas";
import ListaPacientes from "./secretaria/ListaPacientes";
import PanelCitas from "./secretaria/PanelCitas";
import AgendarCita from "./secretaria/AgendarCita";
import PanelPacientes from "./secretaria/PanelPacientes";
import DetalleDePaciente from "./secretaria/DetalleDePaciente";
import RegistroPaciente from "./secretaria/RegistroPaciente";
import Horarios from "./secretaria/Horarios";

// Medico
import DiseñoMedico from "./layouts/DisenoMedico";
import PanelMedico from "./medico/PanelMedico";
import CitasMedico from "./medico/CitasMedico";
import EquipoMedico from "./medico/EquipoMedico";
import Medicamentos from "./medico/Medicamentos";
import HistorialPacientes from "./medico/HistorialPacientes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Layout Secretaria */}
        <Route path='/*' element={<DisenoSecretaria />}>
          <Route index element={<PanelControl />} />
          <Route path="citas" element={<PanelCitas />} />
          <Route path="pacientes" element={<PanelPacientes />} />
          <Route path="citas/lista" element={<ListaCitas />} />
          <Route path="citas/agendar" element={<AgendarCita />} />
          <Route path="pacientes/listado" element={<ListaPacientes />} />
          <Route path="pacientes/registro" element={<RegistroPaciente />} />
          <Route path="paciente/:id" element={<DetalleDePaciente />} />
          <Route path="horarios" element={<Horarios />} />
        </Route>
        {/* Layout Medico */}
        <Route path='/medico/*' element={<DiseñoMedico/>}>
          <Route index element={<PanelMedico/>} />
          <Route path="citas-medico" element={<CitasMedico/>} />
          <Route path="equipo-medico" element={<EquipoMedico/>} />
          <Route path="historial-pacientes" element={<HistorialPacientes/>} />
          <Route path="medicamentos" element={<Medicamentos/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
