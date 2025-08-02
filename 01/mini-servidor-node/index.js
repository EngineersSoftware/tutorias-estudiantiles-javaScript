// Importamos el modulo 'http' para crear el servidor web
const http = require("http");

// Importamos el modulo 'fs' para leer archivos desde el sistema
const fs = require("fs");

// Importamos el 'path' para construir rutas correctas entre carpetas
const path = require("path");

// Definimos el puerto en el que el servidor escuchara las peticiones
const PORT = 3000;

// Creamos el servidor
const server = http.createServer((req, res) => {
  console.log(` Nueva peticion: ${req.method} ${req.url}`);

  // Ruta principal "/"
  if (req.url === "/" && req.method === "GET") {
    const rutaArchivo = path.join(__dirname, "views", "index.html");

    // Leemos el archivo HTML de manera asincronica
    fs.readFile(rutaArchivo, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-type": "text/plain" });
        return res.end("Error interno del servidor");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data); // Enviamos el HTML al cliente
    });

    // Ruta JSON "/api"
  } else if (req.url === "/api" && req.method === "GET") {
    const rutaJson = path.join(__dirname, "data", "mensaje.json");

    // Leemos el archivo HTML de manera asincronica
    fs.readFile(rutaJson, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-type": "text/plain" });
        return res.end("Error al cargar el JSON");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data); // Enviamos el JSON al cliente
    });

    // Cualquier otra RUTA
  } else {
    const rutaError = path.join(__dirname, "views", "error.html");

    fs.readFile(rutaError, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-type": "text/html" });
        return res.end(data);
      }
    });
  }
});

// Escuchamos en el puerto indicado
server.listen(PORT, () => {
    console.log(` Servidor activo en http://localhost:${PORT}`);
});