const oracledb = require("oracledb");

async function conectarBaseDeDatos() {
  try {
    await oracledb.initOracleClient({
      libDir: "C:/Oracle/instantclient_21_12",
    });
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "admin",
      connectString: "localhost:1521/XE",
    });
    console.log("Conexión a Oracle exitosa");
    return connection;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
}

module.exports = { conectarBaseDeDatos };
