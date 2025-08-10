/**
 * En este archivo delegamos la configuracion real a (server.js) para mantener orden
 */

// Importamos dependencias principales
const dotenv = require('dotenv'); // Para manejar variables de entorno
const { starServer } = require('./config/server'); // Nuestra configuracion de servidor

// Cargamos variables de entorno
dotenv.config();

//Iniciamos el servidor
starServer();