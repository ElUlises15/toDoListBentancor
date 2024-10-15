// Variables y Arrays
let tasks = [];
let completedTasks = [];

// Cargar tareas almacenadas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        displayTasks();
    }
    if (localStorage.getItem('completedTasks')) {
        completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
        displayCompletedTasks();
    }
});

// Captura de eventos del formulario para agregar tareas
document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addTask();
});

// Función para agregar tareas
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();

        taskInput.value = ''; // Limpiar el input
    }
}

// Función para mostrar las tareas en la lista
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completada';
        completeButton.addEventListener('click', () => completeTask(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Función para completar una tarea
function completeTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const completedTask = tasks.splice(taskIndex, 1)[0];
        completedTasks.push(completedTask);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

        displayTasks();
        displayCompletedTasks();
    }
}

// Función para mostrar tareas completadas
function displayCompletedTasks() {
    const completedTaskList = document.getElementById('completedTasks');
    completedTaskList.innerHTML = '';

    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        completedTaskList.appendChild(li);
    });
}

// Función para eliminar una tarea
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}
