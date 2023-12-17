import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";

const RegistrarAuxiliar = () => {
  const [rutPersonal, setRutPersonal] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [contacto, setContacto] = useState(0);
  const [direccion, setDireccion] = useState("");
  const [p_nombre_cargo, setP_nombre_cargo] = useState("");
  const [detalleCargo, setDetalleCargo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Crear un objeto con los datos del auxiliar
    const auxiliarData = {
      rutPersonal,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      contacto,
      direccion,
      p_nombre_cargo,
      detalleCargo,
    };

    // Enviar los datos del auxiliar al backend usando Axios
    axiosInstance
      .post("/registrar/auxiliar", auxiliarData)
      .then((response) => {
        console.log("Auxiliar registrado con éxito");
        // Limpiar el formulario
        setRutPersonal(0);
        setNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setContacto(0);
        setDireccion("");
        setP_nombre_cargo("");
        setDetalleCargo("");
      })
      .catch((error) => {
        console.error("Error al registrar el auxiliar:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen mt-12">
    <div className="container mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white p-8 rounded-md shadow-2xl shadow-blue-200"
      >
        <div className="col-span-2 mb-4 text-center">
          <h1 className="text-3xl text-blue-500 font-bold mb-2">
            Formulario de Registro de Auxiliar
          </h1>
        </div>
          <div>
            <label className="block mb-4 text-blue-500">
              Rut Personal:
              <input
                type="number"
                value={rutPersonal}
                onChange={(e) => setRutPersonal(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-blue-100"
                required
              />
            </label>

            <label className="block mb-4 text-blue-500">
              Nombre:
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-blue-100"
                required
              />
            </label>

            <label className="block mb-4 text-blue-500">
              Apellido Paterno:
              <input
                type="text"
                value={apellidoPaterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-blue-100"
                required
              />
            </label>
          </div>

          <div>
            <label className="block mb-4 text-blue-500">
              Apellido Materno:
              <input
                type="text"
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-blue-100"
                required
              />
            </label>

            <label className="block mb-4 text-blue-500">
              Contacto:
              <input
                type="number"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-blue-100"
                required
              />
            </label>

            <label className="block mb-4 text-blue-500">
              Dirección:
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-blue-100"
                required
              />
            </label>
          </div>

          <div className="col-span-2">
            <label className="block mb-4 text-blue-500">
              Nombre del Cargo:
              <input
                type="text"
                value={p_nombre_cargo}
                onChange={(e) => setP_nombre_cargo(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-blue-100"
                required
              />
            </label>

            <label className="block mb-4 text-blue-500">
              Detalle del Cargo:
              <textarea
                value={detalleCargo}
                onChange={(e) => setDetalleCargo(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-blue-100"
                required
              ></textarea>
            </label>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md"
            >
              Registrar Auxiliar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarAuxiliar;
