let input = document.querySelector('#palindrome');
let button = document.querySelector("button");
let result = document.querySelector("span");


let isPalindrome = function () {
    let stringFirst = (input.value).trim();
    let normalizeString = stringFirst.replace(/[^a-zA-Z0-9]/g, "");
    let strArray = Array.from(normalizeString);
    let newArray = [];

    for (let i = strArray.length - 1; i >= 0; i--) {
        newArray.push(strArray[i]);
    }

    let stringSecond = newArray.join("");

    if (!normalizeString) {
        result.textContent = `Please Enter a Word.`;
        result.style.color = "#115cfe";
    } else {
        if (normalizeString.toUpperCase() === stringSecond.toUpperCase()) {
            result.textContent = `"${normalizeString}" is a Palindrom Word.`;
            result.style.color = "#fbff04";
        }
        else {
            result.textContent = `"${normalizeString}" is not a Palindrom Word.`;
            result.style.color = "#8a0202";
        }
    }
}

button.addEventListener('click', isPalindrome);


const navigate = document.querySelector(".navigate");
const up = document.querySelector(".up");
const down = document.querySelector(".down");
const info = document.querySelector(".info");

down.style.display = "none";

function showDetails() {
    info.innerHTML = "<p>A palindrome is a word, phrase, number, or sequence that reads the same forward and backward, ignoring spaces, punctuation, and capitalization.</p>";
    up.style.display = "none";
    down.style.display = "block";
}

function hideDetails() {
    info.innerHTML = "";
    up.style.display = "block";
    down.style.display = "none";
}

up.addEventListener("click", showDetails);

down.addEventListener("click", hideDetails);

document.addEventListener("click", function (event) {
    if (event.target !== up && event.target !== down) {
        hideDetails();
    }
})
