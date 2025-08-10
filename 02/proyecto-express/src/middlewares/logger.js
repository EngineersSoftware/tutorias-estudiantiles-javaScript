function logger ( req, res, next ){
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Continua al siguiente middleware o ruta
}

module.exports = logger;