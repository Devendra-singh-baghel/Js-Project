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
            result.style.color = "#037119";
        }
        else {
            result.textContent = `"${normalizeString}" is not a Palindrom Word.`;
            result.style.color = "#8a0202";
        }
    }
}

button.addEventListener('click', isPalindrome);
