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
    let requiredChars = [];

    if (uppers) {
        charSet += options.upperSet;
        requiredChars.push(options.upperSet[Math.floor(Math.random() * options.upperSet.length)]);
    }
    if (numbers) {
        charSet += options.numSet;
        requiredChars.push(options.numSet[Math.floor(Math.random() * options.numSet.length)]);
    }
    if (symbols) {
        charSet += options.symbolSet;
        requiredChars.push(options.symbolSet[Math.floor(Math.random() * options.symbolSet.length)]);
    }

    let password = requiredChars.join("");

    for (let i = 0; i < length; i++) {
        let indx = Math.floor(Math.random() * charSet.length);
        password += charSet[indx];
    }

    password = password.split("").sort(() => 0.5 - Math.random()).join("");

    return password;
}

function passwordInstruction() {
    const length = Number.parseInt(len.value);
    const uppers = upper.checked;
    const numbers = nums.checked;
    const symbols = special.checked;
    
    if (!length) {
        output.textContent = "Please Enter Password Length!";
        output.style.color = "red";
    }else if(length<8){
        output.textContent = "Password Length Must Be At Least 8 Characters!";
        output.style.color = "red";
        len.value = 8;
        return
    }
    else {
        const password = generatePassword(length, uppers, numbers, symbols);
        output.textContent = password;
        output.style.color = "";
    }
}

function resetInstruction() {
    len.value = "";
    upper.checked = false;
    nums.checked = false;
    special.checked = false;
    output.style.color = "";
    output.textContent = "Your Password Will Appear Here!";
}

generateBtn.addEventListener('click', passwordInstruction);
resetBtn.addEventListener('click', resetInstruction);

