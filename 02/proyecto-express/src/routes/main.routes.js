const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenido a la API con Express.js '})
});

// Ruta de ejemplo con parametro
router.get('/saludo/:nombre', (req,res) => {
    const { nombre } = req.params;
    res.status(200).json({ saludo: `Hola, ${nombre}` });
});

module.exports = router;