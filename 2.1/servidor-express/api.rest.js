const express = require('express');
const env = require('dotenv');

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleare para parsear JSON en las solicitudes
app.use(express.json());

// Datos de ejemplo (simulando una base de datos)
const users = [
    {id: 1, nombre: 'Yeraldin', edad: 20},
    {id: 2, nombre: 'Andres', edad: 28}
];

// Ruta GET: Obtener todos los usuarios
app.get('/api/users', (req, res) => {
    res.json(users); // Responde en un JSON
});

// Ruta GET: Obtener un usuario por ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user)  {
        return res.status(404).json({ error: 'Usuario no encontrado'});
        res.json(user);
    }
});

// Ruta POST: Crear un nuevo usuario
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        nombre: req.body.nombre,
        eddad: req.body.edad
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Inicializacion del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})