const input = document.querySelector("textarea");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-list");
const clearbtn = document.querySelector(".clear-btn");
const indicater = document.querySelector(".indicater");
const completed = document.querySelector(".completed");
const pending = document.querySelector(".pending");
const filterTask = document.querySelector(".filter-task");

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

    const deleteImg = document.createElement('img');
    deleteImg.src = "Assets/trash.svg";
    deleteImg.className = "Delete";
    deleteImg.alt = "Delete";

    if (isCompleted) {
        li.classList.add('done');
        completedTask++;
    } else {
        pendingTask++;
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editImg);
    li.appendChild(deleteImg);
    taskList.appendChild(li);

    updateCounts()
    saveState();
}


/****************************************** Handle local storage ********************************************************************************/

// function for add tasks in local storage
function saveState() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector(".checktask").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// function for get tasks from local storage
function loadState() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addNewTask(task.text, task.completed);
    });
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
        indicater.style.color = "#04dd1a";
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
    const filter = filterTask.value;
    let list = taskList.querySelectorAll('li');

    list.forEach((li) => {

        li.style.display = 'flex';

        switch (filter) {

            case 'complete':
                if (!li.classList.contains("done")) {
                    li.style.display = 'none';
                    pending.style.display = 'none';
                }
                break;

            case 'pending':
                if (li.classList.contains("done")) {
                    li.style.display = 'none';
                    pending.style.display = 'block';
                    completed.style.display = 'none';
                }
                break;

            default:
                li.style.display = 'flex';
                pending.style.display = 'block';
                completed.style.display = 'block';
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

