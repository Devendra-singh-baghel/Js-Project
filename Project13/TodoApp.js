const input = document.querySelector("textarea");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-list");
const clearbtn = document.querySelector(".clear-btn");
const indicater = document.querySelector(".indicater");
const completed = document.querySelector(".completed");
const pending = document.querySelector(".pending");
const filterTask = document.querySelector(".filter-task");
const theme = document.querySelector(".theme-box");

let completedTask = 0;
let pendingTask = 0;


window.addEventListener('DOMContentLoaded', loadState);
// Above line ensures that:-
// loadState() runs after the HTML document is fully loaded and parsed
// All DOM elements (like taskList, buttons, etc.) exist before we try to access them



/****************************************** Create element ********************************************************************************/

// Function to create elements
function addNewTask(Task, isCompleted = false) {

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checktask';
    checkbox.checked = isCompleted;

    const span = document.createElement('span');
    span.textContent = Task;

    const editImg = document.createElement('img');
    editImg.src = "Assets/edit.svg";
    editImg.className = "Edit";
    editImg.alt = "Edit";
    editImg.title = "Edit";

    const deleteImg = document.createElement('img');
    deleteImg.src = "Assets/trash.svg";
    deleteImg.className = "Delete";
    deleteImg.alt = "Delete";
    deleteImg.title = "Delete";

    if (isCompleted) {
        li.classList.add('done');
        completedTask++;
    } else {
        pendingTask++;
    }

    const currentMode = localStorage.getItem("currentMode") || "Dark";
    if (currentMode === "Light") {
        li.style.backgroundColor = "#f5f5ff7f";
        li.style.color = "#000";
    } else {
        li.style.backgroundColor = "#353535";
        li.style.color = "#e8e4e4";
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editImg);
    li.appendChild(deleteImg);
    taskList.appendChild(li);

    updateCounts();
    saveState();
}


/****************************************** Handle local storage ********************************************************************************/

// function for add tasks in local storage
function saveState() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector(".checktask").checked,
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// function for get tasks from local storage
function loadState() {
    //Load tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addNewTask(task.text, task.completed);
    });

    // Load filter value from localStorage
    const savedFilter = localStorage.getItem("currentFilter") || "all";
    filterTask.value = savedFilter; // Set the dropdown value
    handleFilter(); // Apply the filter immediately after loading


    // Load theme from localStorage
    const savedMode = localStorage.getItem("currentMode") || "Dark";
    theme.textContent = savedMode;
    switchTheme();
    updateCounts();
}


/****************************************** Handle task count ********************************************************************************/

//Update task count function
function updateCounts() {
    const checks = document.querySelectorAll('.checktask');
    pendingTask = [...checks].filter(c => !c.checked).length;
    completedTask = checks.length - pendingTask;
    completed.textContent = `Completed: ${completedTask}`;
    pending.textContent = `Pending: ${pendingTask}`;
}

/****************************************** Handle new task ********************************************************************************/

function handleNewTasks(e) {
    const Task = input.value.trim();
    if (Task) {
        addNewTask(Task);
        input.value = "";
        indicater.textContent = "New Task Added";
        if (theme.textContent === "Dark") {
            indicater.style.color = "#0f9600";
        } else {
            indicater.style.color = "#04dd1a";
        }
        updateCounts();
    }

    setTimeout(() => {
        indicater.textContent = "";
    }, 2000);
}

//Event Listener on add button to add new task and show on screen
addBtn.addEventListener('click', handleNewTasks);

//Event Listener on input field to add new task by pressing enter key
input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        handleNewTasks();
    }
})


/****************************************** Add line-through on completed task ********************************************************************************/


// Add line-through on completed task using event delegation by checkmark on checkbox
taskList.addEventListener('change', function (e) {

    if (e.target.type === "checkbox") {

        const li = e.target.parentElement;

        if (e.target.checked) {
            li.classList.add("done");
            updateCounts();
        } else {
            li.classList.remove("done");
            updateCounts();
        }
        saveState();
    }
});


/****************************************** Remove task ********************************************************************************/


// Remove task using event delegation by clicking on trash icon.
taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains("Delete")) {
        const li = e.target.parentElement;

        if (confirm("do you want delete this task?")) {
            li.remove();
            updateCounts();
            saveState();
        }
    }
});


/****************************************** Make task editable ********************************************************************************/


//Event Listener for make task editable
let currentEditableLi = null;
taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains("Edit")) {
        const textSpan = e.target.previousElementSibling;
        const checkmark = textSpan.previousElementSibling;

        // if another li is being edited, save it first 
        if (currentEditableLi) {
            currentEditableLi.contentEditable = false;
        }

        // make li editable 
        if (!checkmark.checked) {
            textSpan.contentEditable = true;
            currentEditableLi = textSpan;
            textSpan.focus();

            textSpan.addEventListener('blur', function () {
                textSpan.contentEditable = false;
                saveState();
            });


            textSpan.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    textSpan.contentEditable = false;
                    saveState();
                }
            });
        }
    }
});


/****************************************** Filter tasks ********************************************************************************/

// function for show filtered tasks 
function handleFilter() {

    if (!filterTask || !taskList || !pending || !completed) return;

    const filter = filterTask.value;
    localStorage.setItem("currentFilter", filter);
    const list = taskList.querySelectorAll('li');



    switch (filter) {
        case 'complete':
            pending.style.display = 'none';
            completed.style.display = 'block';
            break;

        case 'pending':
            pending.style.display = 'block';
            completed.style.display = 'none';
            break;

        default:
            pending.style.display = 'block';
            completed.style.display = 'block';
            break;
    }



    list.forEach((li) => {
        const isDone = li.classList.contains("done");

        // Set task visibility based on filter
        switch (filter) {
            case 'complete':
                li.style.display = isDone ? 'flex' : 'none';
                break;

            case 'pending':
                li.style.display = !isDone ? 'flex' : 'none';
                break;

            default:
                li.style.display = 'flex';
                break;
        }
    });
}

filterTask.addEventListener('change', handleFilter);



/****************************************** Clear all tasks in one click ********************************************************************************/


//Function to clear all tasks
function clearAllTask() {

    if (taskList.children.length > 0) {
        taskList.innerHTML = "";
        updateCounts();
        saveState();
        indicater.textContent = "All Tasks Cleared!";
        indicater.style.color = "red";
        setTimeout(() => {
            indicater.textContent = "";
        }, 2000);
    } else {
        indicater.textContent = "Please Add Task First!";
        indicater.style.color = "red";
        setTimeout(() => {
            indicater.textContent = "";
        }, 2000);
    }

}

clearbtn.addEventListener('click', clearAllTask);



/****************************************** Switch theme Dark/Light ********************************************************************************/


function switchDarkMode() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');

    theme.textContent = "Light";
}

function switchLightMode() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');

    theme.textContent = "Dark";
}



function switchTheme() {

    if (theme.textContent === "Light") {
        switchLightMode();
        localStorage.setItem("currentMode", "Light");
    }
    else {
        switchDarkMode()
        localStorage.setItem("currentMode", "Dark");
    }
}


theme.addEventListener('click', switchTheme);


