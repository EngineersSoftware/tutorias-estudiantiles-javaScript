#  Taller de Práctica – Node.js 

##  Objetivo del taller
Aplicar los conceptos de servidor HTTP, manejo de rutas, métodos HTTP y manipulación de archivos para desarrollar habilidades sólidas en backend con Node.js.



##  Ejercicio 1: Servidor de saludos

**Instrucciones**:
1. Crea un servidor que escuche en el puerto `3000`.
2. Si el usuario accede a `/saludo`, responde: `"Hola, bienvenido a nuestro servidor"`.
3. Si accede a `/despedida`, responde: `"Hasta luego, vuelve pronto"`.
4. Para cualquier otra ruta, responde con un mensaje 404.



##  Ejercicio 2: Guardar mensajes en archivo

**Instrucciones**:
1. Crea una ruta `POST /mensaje`.
2. El cliente enviará un mensaje en texto plano (no JSON).
3. Guarda el contenido en un archivo llamado `mensajes.txt` (modo append).
4. Devuelve como respuesta: `"Mensaje guardado"`.

 Usa el módulo `fs` y `req.on('data')`.



##  Ejercicio 3: Leer mensajes guardados

**Instrucciones**:
1. Crea una ruta `GET /mensajes`.
2. Lee el contenido de `mensajes.txt`.
3. Muestra todos los mensajes como respuesta al cliente.
4. Si el archivo no existe o está vacío, muestra: `"No hay mensajes aún"`.



##  Ejercicio 4: API de usuarios (simulación de CRUD básico)

**Instrucciones**:
1. Usa un archivo `usuarios.json` para almacenar usuarios.
2. Implementa estas rutas:
   - `GET /usuarios` → devuelve la lista completa
   - `POST /usuarios` → recibe JSON con `{ "nombre": "Juan" }` y agrega el usuario al archivo
   - `DELETE /usuarios` → borra el archivo (resetea la lista)

 No uses base de datos, solo el sistema de archivos.

