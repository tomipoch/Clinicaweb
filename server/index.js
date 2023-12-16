//index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");

dotenv.config();
const app = express();

const corsOptions = {
  //Aceptar solicitudes del cliente
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  Acces_Control_Allow_Origin: ["https://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "claveSecreta", // Cambia esto por una cadena secreta más segura en un entorno de producción
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));
app.use(require("./routes/home.js"));
app.set("case sensitive routing", false);
app.set("appName", "Clinica");

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../cliente/index.html"));
});
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
