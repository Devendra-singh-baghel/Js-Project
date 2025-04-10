const input = document.querySelector("input");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-list");
const clearbtn = document.querySelector(".clear-btn");
const indicater = document.querySelector(".indicater");
const completed = document.querySelector(".completed");
const pending = document.querySelector(".pending");

let completedTask = 0;
let pendingTask = 0;
completed.textContent = `Completed: ${completedTask}`;
pending.textContent = `Pending: ${pendingTask}`;


// Function to create elements
function addNewTask(Task) {
    const newLi = document.createElement('li');
    const liText = document.createTextNode(Task);
    const textSpan = document.createElement('span');

    const newCheckBox = document.createElement('input');
    newCheckBox.type = 'checkbox';
    newCheckBox.name = 'checktask';
    newCheckBox.className = 'checktask';

    const trashIcon = document.createElement('img');
    trashIcon.src = "Assets/trash.svg";
    trashIcon.alt = 'Delete';
    trashIcon.className = "Delete"
    trashIcon.title = "Delete"

    const editIcon = document.createElement('img');
    editIcon.src = "Assets/edit.svg";
    editIcon.alt = "Edit";
    editIcon.className = "Edit";
    editIcon.title = "Edit";

    textSpan.appendChild(liText);
    newLi.appendChild(newCheckBox)
    newLi.appendChild(textSpan);
    newLi.appendChild(editIcon);
    newLi.appendChild(trashIcon);

    taskList.appendChild(newLi);

}


/****************************************** Add new task by add button ********************************************************************************/


//Event Listener on add button to add new task and show on screen
addBtn.addEventListener('click', function (e) {
    const Task = input.value.trim();
    if (Task) {
        addNewTask(Task);
        input.value = "";
        indicater.textContent = "New Task Added";
        indicater.style.color = "#04dd1a";
        pendingTask++;
        pending.textContent = `Pending : ${pendingTask}`;
    }

    setTimeout(() => {
        indicater.textContent = "";
    }, 2000);
});


/****************************************** Add new task by pressing enter key ********************************************************************************/


//Event Listener on input field to add new task by pressing enter key
input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {

        const Task = input.value.trim();
        if (Task) {
            addNewTask(Task);
            indicater.textContent = "New Task Added";
            indicater.style.color = "#04dd1a";
            input.value = "";
            pendingTask++;
            pending.textContent = `Pending : ${pendingTask}`;
        }

        setTimeout(() => {
            indicater.textContent = "";
        }, 2000);
    }
})


/****************************************** Add line-through on completed task ********************************************************************************/


// Add line-through on completed task using event delegation by checkmark on checkbox
taskList.addEventListener('change', function (e) {

    if (e.target.type === "checkbox") {

        const li = e.target.parentElement;

        if (e.target.checked) {
            li.classList.add("done");
            pendingTask--;
            completedTask++;
            pending.textContent = `Pending : ${pendingTask}`;
            completed.textContent = `Completed : ${completedTask}`;
        } else {
            li.classList.remove("done");
            pendingTask++;
            completedTask--;
            pending.textContent = `Pending : ${pendingTask}`;
            completed.textContent = `Completed : ${completedTask}`;
        }
    }
});


/****************************************** Remove task ********************************************************************************/


// Remove task using event delegation by clicking on trash icon.
taskList.addEventListener('click', function (e) {
    if (e.target.tagName === "IMG" && e.target.className === "Delete") {
        const li = e.target.parentElement;
        const isCompleted = li.classList.contains("done");

        li.remove();

        if (isCompleted) {
            completedTask--;
        } else {
            pendingTask--;
        }

        completed.textContent = `Completed : ${completedTask}`;
        pending.textContent = `Pending : ${pendingTask}`;
    }
});


/****************************************** Make task editable ********************************************************************************/


//Event Listener for make task editable
let currentEditableLi = null;
taskList.addEventListener('click', function (e) {
    if (e.target.tagName === "IMG" && e.target.className === "Edit") {
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
        }


        // add Event Listener to detect clicks outside of li 
        document.addEventListener('click', handleOutsideClick);
    }
});


// function for save eadited task when click outside of the li 
function handleOutsideClick(e) {

    if (currentEditableLi && !currentEditableLi.closest('li').contains(e.target)) {
        currentEditableLi.contentEditable = false;
        currentEditableLi = null;

        // remove Event Listener after saving edit for avoiding multiple listeners
        document.removeEventListener('click', handleOutsideClick);
    }

}


//Event Listener for save eadited task by pressing enter key
taskList.addEventListener('keydown', function (e) {
    if (currentEditableLi && e.key === "Enter") {
        e.preventDefault();
        currentEditableLi.contentEditable = false;
        currentEditableLi = null;

        document.removeEventListener('click', handleOutsideClick);
    }
})


/****************************************** Clear all tasks in one click ********************************************************************************/


//Function to clear all tasks
function clearAllTask() {

    if (taskList.children.length > 0) {
        taskList.innerHTML = "";
        completedTask = 0;
        pendingTask = 0;
        pending.textContent = `Pending : ${pendingTask}`;
        completed.textContent = `Completed : ${completedTask}`;
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

