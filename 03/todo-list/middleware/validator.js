// middleware/validator.js: Middleware custom para validar el body en peticiones POST/PUT.
module.exports = (req, res, next) => {
  // Solo valida si hay body (POST/PUT tienen body).
  if (req.body) {
    const { task } = req.body; // Extrae 'task' del body.
    if (typeof task !== 'string' || task.trim() === '') { // Verifica tipo string y no vacío.
      return res.status(400).json({ error: 'Task must be a non-empty string' }); // Status 400 (Bad Request) si inválido.
    }
  }
  next(); // Continúa si válido.
};