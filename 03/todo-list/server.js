// server.js: Archivo principal del servidor backend.
require('dotenv').config(); // Carga las variables de .env al proceso de Node.js.

const express = require('express'); // Importa Express, framework para crear servidores web.

const app = express(); // Crea una instancia de la aplicación Express.

const PORT = process.env.PORT || 3000; // Obtiene el puerto de .env o usa 3000 por defecto.

// Middleware built-in: Parsear JSON en el body de peticiones POST/PUT.
app.use(express.json());

// Middleware built-in: Servir archivos estáticos desde la carpeta 'public'.
app.use(express.static('public'));

// Middleware custom: Importa y usa el logger desde middleware/logger.js.
const logger = require('./middleware/logger');
app.use(logger);

// Middleware custom nuevo: Importa el validator desde middleware/validator.js.
const validator = require('./middleware/validator');

// Rutas: Importa y monta las rutas de tasks en /api.
const tasksRouter = require('./routes/tasks');
// Aplicamos validator solo a POST y PUT en /api/tasks y /api/tasks/:id.
app.use('/api/tasks', validator); // Aplica a POST /api/tasks
app.use('/api/tasks/:id', validator); // Aplica a PUT /api/tasks/:id (DELETE no necesita, ya que no tiene body)
app.use('/api', tasksRouter); // Monta el router después de middlewares.

// Manejo de errores global: Middleware que captura errores no manejados.
app.use((err, req, res, next) => {
  console.error(err.stack); // Loguea el error en consola para debugging.
  res.status(500).json({ error: 'Something went wrong!' }); // Envía JSON con error y status 500 (Internal Server Error).
});

// Iniciar el servidor HTTP: Escucha en el puerto especificado.
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje en consola para confirmar inicio.
});