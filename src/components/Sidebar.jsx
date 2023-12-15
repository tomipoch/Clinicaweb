//Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
        <li><Link to="/">Panel de Control</Link></li>
        <li><Link to="/citas">Citas</Link></li>
        <li><Link to="/pacientes">Pacientes</Link></li>
        </ul>
      </div>
    </aside>
  );

};

export default Sidebar;
