let min = document.querySelector("#min");
let max = document.querySelector("#max");
let generateBtn = document.querySelector("#generate");
let resetBtn = document.querySelector("#reset");
let displayNumber = document.querySelector("#displayNumber");


function generateNumber() {
    if (min.value === "" || isNaN(min.value) || min.value >= max.value) {
        displayNumber.textContent = "Enter Valid Minimum Value!";
        displayNumber.style.color = "#6b0606";
    }
    else if (max.value === "" || isNaN(max.value) || max.value <= min.value) {
        displayNumber.textContent = "Enter Valid Maximum Value!";
        displayNumber.style.color = "#6b0606";
    }
    else {
        const minValue = Number.parseInt(min.value);
        const maxValue = Number.parseInt(max.value);

        const randomNumber = Math.floor((Math.random() * (maxValue - minValue + 1)) + minValue);
        displayNumber.textContent = randomNumber;
        displayNumber.style.color = "#02265d";
    }
}

function resetDisplay(){
    min.value = "";
    max.value = "";
    displayNumber.textContent = "";
}
generateBtn.addEventListener('click', generateNumber);
resetBtn.addEventListener('click', resetDisplay);