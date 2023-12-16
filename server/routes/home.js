//home.js
const express = require("express");
const router = express.Router();
const registro = require("./registro");
const login = require("./login");
const pacientes = require("./pacientes");
const medicos = require("./medicos");

router.get("/secretaria/pacientes", pacientes);
router.post("/secretaria/pacientes", pacientes);
router.put("/secretaria/pacientes", pacientes);
router.delete("/secretaria/pacientes", pacientes);

router.get("/medicos", medicos);

router.post("/api/registro", registro);
router.post("/api/login", login);
module.exports = router;
