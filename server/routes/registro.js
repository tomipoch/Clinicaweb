const express = require("express");
const bcrypt = require("bcryptjs");
const { conectarBaseDeDatos } = require("../db/config");
const { CLOB } = require("oracledb");

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    req.conn = await conectarBaseDeDatos(); // Asegúrate de que esta función es compatible con Oracle
    next();
  } catch (error) {
    return res
      .status(500)
      .send("Error al conectar con la base de datos: " + error.message);
  }
});

router.post("/api/registro", async (req, res) => {
  const { cod_credenciales, cod_personal, usuario, contrasena, rol } = req.body;
  console.log("contraseña", contrasena);
  try {
    const hashedPassword = bcrypt.hashSync(contrasena, 10);

    // Insertar datos en la tabla EIFA_CREDENCIALES
    const consultaInsercionPersona =
      "INSERT INTO EIFA_CREDENCIALES (COD_CREDENCIALES, COD_PERSONAL, USUARIO, CONTRASEÑA, ROL) VALUES (:cod_credenciales,:cod_personal, :usuario, :hashedPassword, :rol)";

    const resultPersona = await req.conn.execute(
      consultaInsercionPersona,
      [cod_credenciales, cod_personal, usuario, hashedPassword, rol],
      { autoCommit: true }
    );

    // Finalizar la conexión
    await req.conn.close();
    return res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    if (req.conn) {
      await req.conn.close();
    }
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
