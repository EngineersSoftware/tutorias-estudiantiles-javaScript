# Variables de Entorno (ENV)

## ¿Qué son las Variables de Entorno?
Las variables de entorno son valores que se definen en el sistema operativo y que pueden ser accedidas por las aplicaciones durante su ejecución. En Node.js y Express.js, estas variables se acceden a través del objeto `process.env`.

## ¿Por qué son importantes?

### 1. Seguridad
- Mantienen información sensible fuera del código fuente
- Claves API, contraseñas y tokens no se exponen en el código
- Protegen datos sensibles en repositorios públicos

### 2. Flexibilidad
- Facilitan el cambio de configuración sin modificar el código
- Permiten diferentes configuraciones por ambiente (desarrollo, prueba, producción)
- Simplifican el despliegue en diferentes entornos

### 3. Mejor Práctica
- Separación de configuración y código
- Facilita el mantenimiento y la escalabilidad
- Cumple con las 12 factor app

## Implementación con dotenv

```javascript
// 1. Instalar dotenv
npm install dotenv

// 2. Crear archivo .env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key

// 3. Cargar variables en el archivo principal
require('dotenv').config();

// 4. Usar las variables
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

// 5. Agregar .env a .gitignore para no subirlo al repositorio
```

## Ejemplos Prácticos

### 1. Configuración de Servidor
```javascript
// server.js
require('dotenv').config();
const express = require('express');
const app = express();

// Puerto configurable
const port = process.env.PORT || 3000;

// Modo de desarrollo
const isDev = process.env.NODE_ENV === 'development';

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
  if (isDev) {
    console.log('Modo desarrollo activado');
  }
});
```

### 2. Conexión a Base de Datos
```javascript
// database.js
require('dotenv').config();
const mongoose = require('mongoose');

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch(err => console.error('Error de conexión:', err));
```

### 3. JWT Authentication
```javascript
// auth.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};
```

## Mejores Prácticas

### 1. Seguridad
- **Nunca cometer el archivo .env**
  - Agregar .env a .gitignore
  - Usar .env.example como plantilla

### 2. Manejo de Variables Obligatorias
```javascript
const requiredVars = ['DATABASE_URL', 'JWT_SECRET'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Variable de entorno requerida: ${varName}`);
  }
});
```

### 3. Validación de Variables
```javascript
const validateEnv = () => {
  if (!process.env.PORT || isNaN(Number(process.env.PORT))) {
    throw new Error('PORT debe ser un número');
  }
};
```

### 4. Documentación de Variables
- Mantener un archivo README con variables requeridas
- Documentar valores por defecto
- Especificar rangos válidos

## Consideraciones de Seguridad

### 1. Variables Sensibles
- No usar palabras clave como 'password', 'secret', 'key'
- Usar nombres descriptivos pero seguros
- Evitar nombres obvios que puedan ser adivinados

### 2. Validación de Entrada
- Sanitizar valores antes de usarlos
- Validar formatos (URLs, números, etc.)
- Implementar límites de longitud

### 3. Rotación de Claves
- Implementar un sistema de rotación de claves
- Documentar procedimientos de cambio
- Mantener historial de cambios

## Ejemplo Completo de Implementación

```javascript
// 1. Instalar dependencias
npm install dotenv express mongoose bcryptjs

// 2. Crear archivo .env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key-here
NODE_ENV=development

// 3. Crear archivo .env.example como plantilla
PORT=3000
MONGODB_URI=mongodb://localhost:27017/yourapp
JWT_SECRET=your-secret-key
NODE_ENV=development

// 4. Agregar .env a .gitignore
# .gitignore
.env

// 5. Implementar validación en el servidor
const validateEnvironment = () => {
  const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Variables de entorno faltantes: ${missingVars.join(', ')}`);
  }
};

// 6. Implementar servidor
require('dotenv').config();

validateEnvironment();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API está funcionando');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
```

## Preguntas sobre Variables de Entorno

### Pregunta 1
**Tipo:** Respuesta Abierta

**Pregunta:** Explica qué es dotenv y por qué es importante en un proyecto de Express.js.

**Respuesta esperada:**
dotenv es un paquete que permite cargar variables de entorno desde un archivo .env al objeto process.env en Node.js.
Es importante porque:

- Mantiene configuraciones sensibles fuera del código (puertos, claves API, contraseñas).
- Facilita cambiar la configuración sin modificar el código fuente.
- Ayuda a proteger datos en repositorios públicos.

### Pregunta 2
**Tipo:** Opción Múltiple

**Pregunta:** ¿Qué hace el siguiente fragmento?

```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

A) Crea un servidor Express en el puerto 3000.
B) Lee el archivo .env y obtiene la variable PORT, o usa 3000 si no existe.
C) Inicializa un middleware.
D) Borra variables de entorno.

**Respuesta correcta:** B

**Explicación:** Este código carga las variables de entorno desde el archivo .env usando dotenv y luego obtiene el puerto, usando 3000 como valor por defecto si no se especifica en el archivo .env.