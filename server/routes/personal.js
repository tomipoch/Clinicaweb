const express = require("express");
const { conectarBaseDeDatos } = require("../db/config.js");

const router = express.Router();

// Middleware para conectar a la base de datos
router.use("/", async (req, res, next) => {
  try {
    req.conn = await conectarBaseDeDatos();
    next();
  } catch (error) {
    res.send(error);
    next(error);
  }
});

// Ruta para guardar información de personal
router.post("/personal", async (req, res) => {
  const {
    p_OPERATION,
    p_COD_PERSONAL,
    p_RUT_PERSONAL,
    p_NOMBRE,
    p_APELLIDO_PATERNO,
    p_APELLIDO_MATERNO,
    p_CONTACTO,
    p_DIRECCION,
  } = req.body;

  try {
    // Llama al procedimiento CRUD_PERSONAL de Oracle con los parámetros correspondientes
    const result = await req.conn.execute(
      "BEGIN CRUD_PERSONAL(:p_OPERATION, :p_COD_PERSONAL, :p_RUT_PERSONAL, :p_NOMBRE, :p_APELLIDO_PATERNO, :p_APELLIDO_MATERNO, :p_CONTACTO, :p_DIRECCION); END;",
      {
        p_OPERATION,
        p_COD_PERSONAL,
        p_RUT_PERSONAL,
        p_NOMBRE,
        p_APELLIDO_PATERNO,
        p_APELLIDO_MATERNO,
        p_CONTACTO,
        p_DIRECCION,
      }
    );

    // Comprobar el resultado del procedimiento y responder en consecuencia
    if (result.outBinds.p_RESULT === "SUCCESS") {
      res.json({ message: "Personal guardado con éxito" });
    } else {
      res.status(400).json({ error: result.outBinds.p_RESULT });
    }
  } catch (error) {
    next(error);
  }
});

// Ruta para guardar información de médico
router.post("/medico", async (req, res) => {
  const { p_OPERATION, p_COD_MEDICO, p_COD_PERSONAL, p_COD_ESPECIALIDAD } =
    req.body;

  try {
    // Llama al procedimiento CRUD_MEDICO de Oracle con los parámetros correspondientes
    const result = await req.conn.execute(
      "BEGIN CRUD_MEDICO(:p_OPERATION, :p_COD_MEDICO, :p_COD_PERSONAL, :p_COD_ESPECIALIDAD); END;",
      {
        p_OPERATION,
        p_COD_MEDICO,
        p_COD_PERSONAL,
        p_COD_ESPECIALIDAD,
      }
    );

    // Comprobar el resultado del procedimiento y responder en consecuencia
    if (result.outBinds.p_RESULT === "SUCCESS") {
      res.json({ message: "Médico guardado con éxito" });
    } else {
      res.status(400).json({ error: result.outBinds.p_RESULT });
    }
  } catch (error) {
    next(error);
  }
});

// Ruta para guardar información de auxiliar
router.post("/auxiliar", async (req, res) => {
  const { p_accion, p_cod_cargo, p_cod_auxiliar, p_nombre_cargo } = req.body;

  try {
    // Llama al procedimiento crud_auxiliares de Oracle con los parámetros correspondientes
    const result = await req.conn.execute(
      "BEGIN crud_auxiliares(:p_accion, :p_cod_cargo, :p_cod_auxiliar, :p_nombre_cargo, :p_resultado); END;",
      {
        p_accion,
        p_cod_cargo,
        p_cod_auxiliar,
        p_nombre_cargo,
        p_resultado: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
      }
    );

    // Comprobar el resultado del procedimiento y responder en consecuencia
    if (result.outBinds.p_resultado === null) {
      res.json({ message: "Auxiliar guardado con éxito" });
    } else {
      res.status(400).json({ error: result.outBinds.p_resultado });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
