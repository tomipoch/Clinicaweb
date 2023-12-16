const express = require("express");

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

router.get("/medicos", (req, res) => {
  try {
    const result = req.conn.execute("SELECT * FROM TFPC_MEDICO");
    const rows = result.rows; // Recupera todas las filas
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.get("/medicos/pacientes", (req, res) => {});

module.exports = router;
