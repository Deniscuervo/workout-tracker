// Importar express
const express = require("express");

// Importar configuración (ejemplo: { port: 3000 })
const { port } = require("./config/env");

// Crear instancia de express
const app = express();

// Ruta inicial
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
