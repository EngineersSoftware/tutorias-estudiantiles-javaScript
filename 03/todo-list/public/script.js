const form = document.getElementById('task-form'); // Selecciona el formulario.
const input = document.getElementById('task-input'); // Selecciona el input de task.
const editId = document.getElementById('edit-id'); // Selecciona el hidden input para ID.
const list = document.getElementById('task-list'); // Selecciona la lista UL.

// Función asíncrona: Carga tareas desde la API.
async function loadTasks() {
  const response = await fetch('/api/tasks'); // Fetch GET a /api/tasks.
  if (response.ok) { // Verifica status 200-299.
    const tasks = await response.json(); // Parsea JSON.
    list.innerHTML = ''; // Limpia la lista actual.
    tasks.forEach(task => { // Itera sobre tareas.
      const li = document.createElement('li'); // Crea LI.
      li.textContent = task.task; // Asigna texto de la tarea.
      li.dataset.id = task.id; // Almacena ID en data attribute.

      // Botón editar: Nuevo para PUT.
      const editBtn = document.createElement('button'); // Crea botón edit.
      editBtn.textContent = 'Editar'; // Texto.
      editBtn.classList.add('edit-btn'); // Clase para CSS.
      editBtn.onclick = () => { // Evento click: Prepara edición.
        input.value = task.task; // Carga task en input.
        editId.value = task.id; // Set ID en hidden.
        form.querySelector('button').textContent = 'Actualizar'; // Cambia botón a 'Actualizar'.
      };
      li.appendChild(editBtn); // Agrega a LI.

      // Botón eliminar: Nuevo para DELETE.
      const deleteBtn = document.createElement('button'); // Crea botón delete.
      deleteBtn.textContent = 'Eliminar'; // Texto.
      deleteBtn.classList.add('delete-btn'); // Clase para CSS.
      deleteBtn.onclick = async () => { // Evento click: Elimina.
        const response = await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' }); // Fetch DELETE con ID.
        if (response.ok) {
          loadTasks(); // Recarga lista.
        } else {
          alert('Error al eliminar tarea');
        }
      };
      li.appendChild(deleteBtn); // Agrega a LI.

      list.appendChild(li); // Agrega LI a UL.
    });
  } else {
    alert('Error al cargar tareas'); // Manejo de error.
  }
}

// Evento: Submit del form para agregar/editar.
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Previene recarga.
  const task = input.value.trim(); // Obtiene y limpia input.
  if (!task) return; // Sale si vacío.

  let url = '/api/tasks'; // URL base para POST.
  let method = 'POST'; // Método default POST.
  if (editId.value) { // Si hay ID, es edición (PUT).
    url = `/api/tasks/${editId.value}`; // URL con ID.
    method = 'PUT'; // Cambia a PUT.
  }

  const response = await fetch(url, {
    method, // Usa el método dinámico.
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }) // Body con task.
  });

  if (response.ok) {
    input.value = ''; // Limpia input.
    editId.value = ''; // Resetea ID.
    form.querySelector('button').textContent = 'Agregar'; // Restaura botón.
    loadTasks(); // Recarga lista.
  } else {
    const data = await response.json();
    alert(data.error || 'Error al guardar tarea');
  }
});

// Carga inicial.
loadTasks();