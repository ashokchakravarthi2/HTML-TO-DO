document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const descriptionInput = document.getElementById("descriptionInput");
    const dateTimeInput = document.getElementById("dateTimeInput");

    const taskText = taskInput.value.trim();
    const descriptionText = descriptionInput.value.trim();
    const dateTimeText = dateTimeInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("tasks");

        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskParagraph = document.createElement("p");
        taskParagraph.textContent = `Task: ${taskText} | Description: ${descriptionText} | Date & Time: ${dateTimeText}`;

        const removeButton = createButton("Remove", "remove-btn", function () {
            removeTask(taskElement);
        });

        const completeButton = createButton("Complete", "complete-btn", function () {
            toggleTaskCompletion(taskElement);
        });

        taskElement.appendChild(taskParagraph);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(removeButton);

        taskList.appendChild(taskElement);

        saveTask(taskText, descriptionText, dateTimeText);

        taskInput.value = "";
        descriptionInput.value = "";
        dateTimeInput.value = "";
    }
}

function removeTask(taskElement) {
    taskElement.classList.add("fade-out");
    setTimeout(function () {
        taskElement.remove();
    }, 500);

    removeTaskFromStorage(taskElement.querySelector("p").textContent);
}

function toggleTaskCompletion(taskElement) {
    taskElement.classList.toggle("completed");
    updateTaskInStorage(taskElement.querySelector("p").textContent);
}

function saveTask(taskText, descriptionText, dateTimeText) {
    let tasks = getTasksFromStorage();
    tasks.push({ task: taskText, description: descriptionText, dateTime: dateTimeText });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.map(task => (task === taskText ? task : task));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    const taskList = document.getElementById("tasks");

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskParagraph = document.createElement("p");
        taskParagraph.textContent = `Task: ${task.task} | Description: ${task.description} | Date & Time: ${task.dateTime}`;

        const removeButton = createButton("Remove", "remove-btn", function () {
            removeTask(taskElement);
        });

        const completeButton = createButton("Complete", "complete-btn", function () {
            toggleTaskCompletion(taskElement);
        });

        taskElement.appendChild(taskParagraph);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(removeButton);

        taskList.appendChild(taskElement);
    });
}

function createButton(text, className, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    button.onclick = clickHandler;
    return button;
}

function clearAllTasks() {
    const taskList = document.getElementById("tasks");
    while (taskList.firstChild) {
        taskList.firstChild.remove();
    }
    localStorage.removeItem("tasks");
}

function showPreviousTasks() {
    const previousTasksDiv = document.getElementById("previousTasks");
    const tasks = getTasksFromStorage();

    if (tasks.length > 0) {
        previousTasksDiv.innerHTML = ""; // Clear previous tasks
        tasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("previous-task");

            const taskParagraph = document.createElement("p");
            taskParagraph.textContent = `Task: ${task.task} | Description: ${task.description} | Date & Time: ${task.dateTime}`;

            taskElement.appendChild(taskParagraph);
            previousTasksDiv.appendChild(taskElement);
        });

        previousTasksDiv.style.display = "block";
    } else {
        alert("No previous tasks available!");
    }
}
