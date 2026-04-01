const tasksKey = "tasks";
const taskFilterKey = "taskFilterPendingOnly";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const pendingFilter = document.getElementById("pending-filter");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const statusMessage = document.getElementById("status-message");

let tasks = [];

function showStatus(message) {
  statusMessage.textContent = message;
  setTimeout(() => {
    statusMessage.textContent = "";
  }, 2500);
}

function saveTasks() {
  try {
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
    showStatus("No se han podido guardar las tareas.");
  }
}

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(tasksKey);
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error al cargar tareas:", error);
    tasks = [];
    showStatus("No se han podido recuperar las tareas guardadas.");
  }
}

function saveFilterState() {
  try {
    sessionStorage.setItem(taskFilterKey, JSON.stringify(pendingFilter.checked));
  } catch (error) {
    console.error("Error al guardar filtro en sessionStorage:", error);
  }
}

function loadFilterState() {
  try {
    const storedFilter = sessionStorage.getItem(taskFilterKey);
    pendingFilter.checked = storedFilter ? JSON.parse(storedFilter) : false;
  } catch (error) {
    console.error("Error al cargar filtro:", error);
    pendingFilter.checked = false;
  }
}

function getVisibleTasks() {
  if (!pendingFilter.checked) {
    return tasks;
  }

  return tasks.filter((task) => !task.completed);
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  taskList.innerHTML = "";

  if (visibleTasks.length === 0) {
    taskList.innerHTML = `<li class="empty-message">No hay tareas para mostrar.</li>`;
    return;
  }

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";

    const main = document.createElement("div");
    main.className = "task-main";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = `task-text ${task.completed ? "completed" : ""}`;
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    main.appendChild(checkbox);
    main.appendChild(text);

    item.appendChild(main);
    item.appendChild(deleteButton);

    taskList.appendChild(item);
  });
}

function addTask(text) {
  const newTask = {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  showStatus("Tarea añadida correctamente.");
}

function toggleTask(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
  showStatus("Tarea eliminada.");
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
  showStatus("Tareas completadas eliminadas.");
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = taskInput.value.trim();

  if (!value) {
    showStatus("Introduce una tarea válida.");
    return;
  }

  addTask(value);
  taskInput.value = "";
  taskInput.focus();
});

pendingFilter.addEventListener("change", () => {
  saveFilterState();
  renderTasks();
});

clearCompletedBtn.addEventListener("click", () => {
  clearCompletedTasks();
});

window.addEventListener("load", () => {
  loadTasks();
  loadFilterState();
  renderTasks();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => {
        console.log("Service Worker registrado correctamente.");
      })
      .catch((error) => {
        console.error("Error al registrar el Service Worker:", error);
      });
  }
});