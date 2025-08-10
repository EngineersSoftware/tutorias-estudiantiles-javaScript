// Configuracion del servidor

// Importamos dependencias
const express = require('express');
const mainRoutes = require('../routes/main.routes'); // Rutas principales
const logger = require('../middlewares/logger'); // Middleware personalizado

// Escuchar en el puerto definido en .env
const PORT = process.env.PORT || 3000;

function starServer ()  {
    const app =express();

    // Middleware para interpretar JSON en las peticiones
    app.use(express.json());

    // Middleware personalizado de registro de peticiones
    app.use(logger);

    // Rutas principales
    app.use('/', mainRoutes);

    // Manejo de rutas no encontradas (404)
    app.use(( req, res ) => {
        res.status(404).json({ status: 404, message: 'Ruta no encontrada' });
    });

    //Manejo de errores internos (500)
    app.use(( err, req, res, next ) => {
        console.error('Error interno', err.message);
        res.status(500).json({ status: 500, message: 'Error interno del servidor' });
    });

    //Usamos el puerto por el que correra el servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

}

module.exports = { starServer };