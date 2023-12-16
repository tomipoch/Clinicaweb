const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { conectarBaseDeDatos } = require("../db/config.js");

const router = express.Router();

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);

  try {
    const conn = await conectarBaseDeDatos();
    const result = await conn.execute(
      "SELECT * FROM EIFA_CREDENCIALES WHERE usuario = :username",
      [username] // Usar un array para los parámetros si la librería lo soporta.
    );

    // Acceder al primer elemento del primer arreglo para obtener los datos de la fila
    const userRow = result.rows[0];

    if (userRow.length === 0 || !bcrypt.compareSync(password, userRow[3])) {
      // Si no hay coincidencia de usuario o la contraseña no coincide
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Si el usuario es válido, generar y enviar token
    const token = jwt.sign(
      { userId: userRow[0] }, // El ID del usuario está en la primera posición del arreglo
      process.env.JWT_SECRET,
      { expiresIn: "30m" } // Duración del token
    );

    // Enviar el token y el rol del usuario en la respuesta
    res.json({ token: token, rol: userRow[4] }); // El rol del usuario está en la quinta posición del arreglo
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
});

module.exports = router;
