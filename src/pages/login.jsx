import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    // Realizar la solicitud POST con Axios
    axiosInstance
      .post("http://localhost:3000/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { token, rol } = response.data;
        localStorage.setItem("token", token);

        // Redirigir según el rol del usuario
        if (rol === "secretaria") {
          navigate("/PanelControl");
        } else if (rol === "usuario") {
          navigate("/PanelPacientes");
        } else {
          navigate("/"); // Redirigir a una página predeterminada para otros roles
        }
      })
      .catch((error) => {
        // Manejar el error de inicio de sesión
        console.error("Error de inicio de sesión", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="py-[8rem] px-[4rem] rounded-xl shadow-2xl bg-white bg-clip-border">
        <h1 className="text-3xl uppercase tracking-[5px] mb-8 font-semibold leading-snug text-gray-700 antialiased">
          Iniciar sesión
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4 border rounded-lg">
            <input
              type="text"
              value={username}
              className="text-black py-3 pl-8 pr-4 w-full outline-none rounded-lg bg-white"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
            />
          </div>
          <div className="relative border rounded-lg">
            <input
              type="password"
              value={password}
              className="text-black py-3 px-8 w-full outline-none rounded-lg bg-white"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 w-full mt-6 py-3 px-4 rounded-lg text-white hover:text-gray-100 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
