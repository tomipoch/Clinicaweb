const express = require("express");
const oracledb = require("oracledb");
const { conectarBaseDeDatos } = require("../db/config.js");
const router = express.Router(); // Corrige el error en la declaración

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

// Ruta para obtener la lista de pacientes
router.get("/secretaria/pacientes", async (req, res, next) => {
  try {
    const result = await req.conn.execute("SELECT * FROM MJVA_PACIENTE");
    const rows = result.rows; // Recupera todas las filas
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post("/secretaria/pacientes", async (req, res, next) => {
  try {
    const {
      rutPaciente,
      nombrePaciente,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      contacto,
      direccion,
    } = req.body;
    const fechaNacimientoM = new Date(fechaNacimiento);
    const result = await req.conn.execute(
      `BEGIN
         CRUD_PACIENTE('INSERT', :rutPaciente, :nombrePaciente, :apellidoPaterno, :apellidoMaterno, :fechaNacimientoM, :contacto, :direccion);
       END;`,
      {
        rutPaciente,
        nombrePaciente,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimientoM,
        contacto,
        direccion,
      }
    );
    console.log("hola");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar un paciente
router.put("/secretaria/pacientes/:rutPaciente", async (req, res) => {
  try {
    const rutPaciente = req.params.rutPaciente;
    const {
      nombrePaciente,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      contacto,
      direccion,
    } = req.body;
    const result = await req.conn.execute(
      `BEGIN
         CRUD_PACIENTE('UPDATE', :rutPaciente, :nombrePaciente, :apellidoPaterno, :apellidoMaterno, :fechaNacimiento, :contacto, :direccion);
       END;`,
      {
        rutPaciente,
        nombrePaciente,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        contacto,
        direccion,
      }
    );
    res.json({ message: "Paciente actualizado exitosamente" });
  } catch (error) {
    res.send(error);
  }
});

// Ruta para eliminar un paciente
router.delete("/secretaria/pacientes", async (req, res) => {
  try {
    const rutPaciente = Number(req.body.rut);
    await req.conn.execute(
      `BEGIN
         CRUD_PACIENTE('DELETE', :rutPaciente, NULL, NULL, NULL, NULL, NULL, NULL);
       END;`,
      { rutPaciente }
    );
    req.conn.commit();
    res.json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    res.send(error);
  }
});

module.exports = router;
