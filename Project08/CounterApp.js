let btn1 = document.querySelector("#increment");
let btn2 = document.querySelector("#decrement");
let upword = document.querySelector("#upword");
let down = document.querySelector("#down");
let preview = document.querySelector("#preview");

let count = 0
let btn1Clicked = 0;
let btn2Clicked = 0;

function countIncrement() {
    count++;
    btn1Clicked++;
}

function countDecrement() {
    count--;
    btn2Clicked++;
}

function resetDisplay() {
    if (btn1Clicked >= 10 && btn2Clicked >= 10) {
        btn1Clicked = 0;
        btn2Clicked = 0;
        count = 0;
    }
}

function updateDisplay() {
    preview.textContent = count;
    upword.textContent = btn1Clicked;
    down.textContent = btn2Clicked;
}

btn1.addEventListener('click', function (e) {
    if (count !== 10) {
        countIncrement();
        resetDisplay();
        updateDisplay();
    }
    else {
        e.preventDefault();
    }
});

btn2.addEventListener('click', function (e) {
    if (count !== 0) {
        countDecrement();
        resetDisplay();
        updateDisplay();
    }
    else {
        e.preventDefault();
    }
});

