import React, { useState, useEffect } from "react";
const CitasMedico = () => {
  const [citas, setCitas] = useState([]);
  const [citasEditando, setCitasEditando] = useState({
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    ciudad: '',
    telefono: '',
    mensaje: '',
    index: null,
  });

  const agregarCita = () => {
    const nuevaCita = {
      id: citas.length + 1, // Usar un ID único
      nombre: 'Matias',
      apellido: 'Varas',
      email: 'xxx@gmail.com',
      ciudad: 'talca',
      telefono: '9898999',
      mensaje: 'Mensaje de clinica oftalmologica',
    };

    setCitas([...citas, nuevaCita]);
  };

  const editarCitas = (index) => {
    const citaEnEdicion = citas[index];
    setCitasEditando({ ...citaEnEdicion, index });
  };

  const manejarCambioCampo = (campo, valor) => {
    setCitasEditando((prevCitasEditando) => ({
      ...prevCitasEditando,
      [campo]: valor,
    }));
  };

  const guardarEdicion = () => {
    const nuevaCita = [...citas];
    nuevaCita[citasEditando.index] = { ...citasEditando };
    setCitas(nuevaCita);
    cancelarEdicion();
  };

  const cancelarEdicion = () => {
    setCitasEditando({
      id: null,
      nombre: '',
      apellido: '',
      email: '',
      ciudad: '',
      telefono: '',
      mensaje: '',
      index: null,
    });
  };

  const eliminarCita = (index) => {
    const nuevaCita = citas.filter((_, i) => i !== index);
    setCitas(nuevaCita);
    cancelarEdicion();
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col mt-1">
      <h1 className="text-3xl text-blue-500 font-bold mb-8">Lista de Pacientes</h1>
      <div className='flex flex-row gap-2'>
        <button onClick={agregarCita} className='bg-green-500 text-white shadow-2xl shadow-green-500 flex items-center gap-2 py-2 px-4 mb-10 rounded-lg hover'>
          Agregar
        </button>
      </div>
      <div className="overflow-x-auto shadow-2xl shadow-blue-300 rounded-2xl">
        <table className='w-full rounded-2xl table-auto'>
          <thead className='bg-blue-500 text-white'>
            <tr>
              <th className='p-2'>ID</th>
              <th className='p-2'>Nombre</th>
              <th className='p-2'>Apellido</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Ciudad</th>
              <th className='p-2'>Telefono</th>
              <th className='p-2'>Mensaje</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita, index) => (
              <tr key={index}>
                <td className='p-2 bg-white text-blue-500'>
                  {citasEditando.index === index ? (
                    <input
                      type='text'
                      value={citasEditando.id}
                      onChange={(e) => manejarCambioCampo('id', e.target.value)}
                      className='p-2 w-full border rounded bg-transparent'
                    />
                  ) : (
                    cita.id
                )}
              </td>
              <td className='p-2 bg-white text-blue-500'>
                {citasEditando.index === index ? (
                  <input
                    type='text'
                    value={citasEditando.nombre}
                    onChange={(e) => manejarCambioCampo('nombre', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  cita.nombre
                )}
              </td>
              <td className='p-2 bg-white text-blue-500'>
                {citasEditando.index === index ? (
                  <input
                    type='text'
                    value={citasEditando.apellido}
                    onChange={(e) => manejarCambioCampo('apellido', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  cita.apellido
                )}
              </td>
              <td className='p-2 bg-white text-blue-500'>
                {citasEditando.index === index ? (
                  <input
                    type='text'
                    value={citasEditando.email}
                    onChange={(e) => manejarCambioCampo('email', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  cita.email
                )}
              </td>
              <td className='p-2 bg-white text-blue-500'>
                {citasEditando.index === index ? (
                  <input
                    type='text'
                    value={citasEditando.ciudad}
                    onChange={(e) => manejarCambioCampo('ciudad', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  cita.ciudad
                )}
              </td>
              <td className='p-2 bg-white text-blue-500'>
                {citasEditando.index === index ? (
                  <input
                    type='text'
                    value={citasEditando.telefono}
                    onChange={(e) => manejarCambioCampo('telefono', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  cita.telefono
                )}
              </td>
              <td className='p-2 bg-white text-blue-500'>
                {citasEditando.index === index ? (
                  <input
                    type='text'
                    value={citasEditando.mensaje}
                    onChange={(e) => manejarCambioCampo('mensaje', e.target.value)}
                    className='p-2 w-full border rounded bg-transparent'
                  />
                ) : (
                  cita.mensaje
                )}
              </td>
              <td className='p-2 bg-white flex justify-end'>
                {citasEditando.index === index ? (
                  <>
                    <button className='bg-green-500 text-white py-1 px-2 rounded-lg mr-2' onClick={guardarEdicion}>
                      Guardar
                    </button>
                    <button className='bg-gray-400 text-green py-1 px-2 rounded-lg ' onClick={cancelarEdicion}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button className='bg-blue-500 text-white py-1 px-2 rounded-lg mr-2 ' onClick={() => editarCitas(index)}>
                      Editar
                    </button>
                    <button className='bg-red-500 text-white py-1 px-2 rounded-lg mr-2' onClick={() => eliminarCita(index)}>
                       Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default CitasMedico;