# Examen Técnico de Express.js


# Pregunta 1
**Tipo:** Opción Múltiple

**Pregunta:** ¿Cuál de las siguientes afirmaciones describe mejor a Express.js?

A) Es un framework de Node.js que facilita la creación de servidores y APIs.
B) Es una base de datos NoSQL.
C) Es un lenguaje de programación.
D) Es un sistema operativo para servidores.

**Respuesta correcta:** A

**Explicación:** Express.js no es un lenguaje ni una base de datos; es un framework de Node.js para desarrollar aplicaciones web y APIs.

# Pregunta 2
**Tipo:** Opción Múltiple

**Pregunta:** ¿Cuál es la función principal de express.json() en una aplicación Express?

A) Manejar rutas.
B) Analizar el cuerpo (body) de las peticiones en formato JSON.
C) Conectar a una base de datos.
D) Servir archivos estáticos.

**Respuesta correcta:** B

**Explicación:** express.json() es un middleware integrado que transforma el cuerpo de la petición en un objeto JavaScript.


# Pregunta 3
**Tipo:** Verdadero / Falso

**Pregunta:** Un middleware en Express siempre debe llamar a next() para que la ejecución continúe a la siguiente función o ruta.

**Respuesta:** Verdadero (con excepción de que finalice la respuesta con res.send() o similar).

**Explicación:** Si no se llama a next() y no se envía respuesta, la petición quedará “colgada” sin respuesta.

# Pregunta 6
**Tipo:** Opción Múltiple

**Pregunta:** ¿Qué hace el siguiente código?

```javascript
app.use((req, res, next) => {
  console.log(`Método: ${req.method}, Ruta: ${req.url}`);
  next();
});
```

A) Configura el puerto del servidor.
B) Declara un middleware que registra las peticiones.
C) Envía una respuesta HTML.
D) Conecta a una base de datos.

**Respuesta correcta:** B

**Explicación:** Este middleware imprime información de la petición en consola y luego pasa el control a la siguiente función.



# Pregunta 4
**Tipo:** Respuesta Abierta

**Pregunta:** Explica qué es dotenv y por qué es importante en un proyecto de Express.js.

**Respuesta esperada:**
dotenv es un paquete que permite cargar variables de entorno desde un archivo .env al objeto process.env en Node.js.
Es importante porque:

- Mantiene configuraciones sensibles fuera del código (puertos, claves API, contraseñas).
- Facilita cambiar la configuración sin modificar el código fuente.
- Ayuda a proteger datos en repositorios públicos.

# Pregunta 9
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




# Pregunta 5
**Tipo:** Opción Múltiple

**Pregunta:** ¿Cuál de los siguientes códigos HTTP indica que un recurso fue creado exitosamente?

A) 200
B) 201
C) 400
D) 500

**Respuesta correcta:** B

**Explicación:** 201 Created indica que la solicitud se completó y se creó un nuevo recurso.

# Pregunta 8
**Tipo:** Verdadero / Falso

**Pregunta:** El código de estado 404 significa que el servidor tuvo un error interno.

**Respuesta:** Falso

**Explicación:** 404 Not Found significa que el recurso solicitado no existe. El error interno es 500.





# Pregunta 10
**Tipo:** Respuesta Abierta

**Pregunta:** ¿Qué es un middleware de manejo de errores en Express y cómo se define?

**Respuesta esperada:**
Es una función especial que captura y maneja errores en la aplicación. Se define con cuatro parámetros (err, req, res, next). Ejemplo:

```javascript
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Error interno' });
});
```

# Pregunta 7
**Tipo:** Respuesta Abierta

**Pregunta:** Menciona tres ventajas de usar Express.js sobre Node.js puro.

**Respuesta esperada:**

- Sintaxis más sencilla para manejar rutas.
- Middlewares integrados para manejo de JSON, datos, etc.
- Comunidad amplia y muchos paquetes complementarios.