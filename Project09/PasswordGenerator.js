let len = document.querySelector("#len");
let upper = document.querySelector("#upper");
let nums = document.querySelector("#nums");
let special = document.querySelector("#special");
let generateBtn = document.querySelector("#generate");
let resetBtn = document.querySelector("#reset");
let output = document.querySelector("#passOut");


function generatePassword(length, uppers, numbers, symbols) {

    const options = {
        lowerSet: "abcdefghijklmnopqrstuvwxyz",
        upperSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numSet: "0123456789",
        symbolSet: "!@#$%&"
    };

    let charSet = options.lowerSet;

    if (uppers) {
        charSet += options.upperSet;
    }
    if (numbers) {
        charSet += options.numSet;
    }
    if (symbols) {
        charSet += options.symbolSet;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        let indx = Math.floor(Math.random() * charSet.length);
        password += charSet[indx];
    }
    return password;
}

function passwordInstruction() {
    const length = Number.parseInt(len.value);
    const uppers = upper.checked;
    const numbers = nums.checked;
    const symbols = special.checked;
    
    if (length) {
        const password = generatePassword(length, uppers, numbers, symbols);
        output.textContent = password;
    } else {
        output.textContent = "Please Enter Valid Length!";
    }
}

function resetInstruction() {
    len.value = "";
    upper.checked = false;
    nums.checked = false;
    special.checked = false;
    output.textContent = "Your Password Will Appear Here!";
}

generateBtn.addEventListener('click', passwordInstruction);
resetBtn.addEventListener('click', resetInstruction);

