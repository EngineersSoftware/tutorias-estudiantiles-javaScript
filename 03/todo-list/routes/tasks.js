// routes/tasks.js: Define las rutas para la API de tareas.
const express = require('express'); // Importa Express para crear un router.

const router = express.Router(); // Crea un router independiente.

// Almacenamiento simple: Array de objetos {id, task} en memoria (para demo).
let tasks = [];
let nextId = 1; // Contador para IDs incrementales.

// Endpoint GET /tasks: Obtiene todas las tareas.
router.get('/tasks', (req, res) => {
  res.status(200).json(tasks); // Envía las tareas como JSON con status 200.
  
});

// Endpoint GET /tasks/:id: Obtiene una tarea por ID.
router.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id); // Obtiene y parsea ID de URL params.
  
  const task = tasks.find(t => t.id === id); // Busca tarea por ID.
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' }); // Status 404 (Not Found) si no existe.
  }
  res.status(200).json(task); // Envía la tarea con status 200.
});

// Endpoint POST /tasks: Agrega una nueva tarea.

router.post('/tasks', (req, res) => {
  const { task } = req.body; // Extrae 'task' del body JSON (validado por middleware).
  
  const newTask = { id: nextId++, task }; // Crea objeto con ID incremental.
  
  tasks.push(newTask); // Agrega al array.
  res.status(201).json({ message: 'Task added', task: newTask }); // Status 201 (Created) con la nueva tarea.
});

// Endpoint PUT /tasks/:id: Actualiza una tarea por ID.
router.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id); // Obtiene y parsea ID.
  const { task: updatedTask } = req.body; // Extrae nuevo 'task' del body (validado por middleware).
  const index = tasks.findIndex(t => t.id === id); // Encuentra índice por ID.
  
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' }); // 404 si no existe.
  }
  tasks[index].task = updatedTask; // Actualiza el task.
  res.status(200).json({ message: 'Task updated', task: tasks[index] }); // Status 200 con tarea actualizada.
  
});

// Endpoint DELETE /tasks/:id: Elimina una tarea por ID.
router.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id); // Obtiene y parsea ID.
  const index = tasks.findIndex(t => t.id === id); // Encuentra índice.
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' }); // 404 si no existe.
  }
  tasks.splice(index, 1); // Elimina del array.
  res.status(204).send(); // Status 204 (No Content) sin body.
});

module.exports = router; // Exporta el router para usarlo en server.js.
