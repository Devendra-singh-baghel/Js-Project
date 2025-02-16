let max = 100;
let randomNumber = Math.floor(Math.random() * max);

const userInput = document.querySelector('#userinput');
const check = document.querySelector('#check');
const userguesses = document.querySelector('#userguesses');
const finalResult = document.querySelector('#finalResult');
const lowhi = document.querySelector('#lowhi');
const result = document.querySelector('.result');

const p = document.createElement('p');

let noOfGuesses = 0;
let preGuesses = [];
let playGame = true;
let lastResult = 0;

if(playGame)
{
    check.addEventListener('click', (action) =>{
        action.preventDefault();
        let guess = parseInt(userInput.value);
        // console.log(guess);
        validateGuess(guess);
    })
}

function validateGuess(guess)
{
    if(isNaN(guess))
    {
        alert('Please enter a valid number!');
    }
    else if(guess < 1 || guess > 100)
    {
        alert('Please enter a number between 1 to 100 ');
    }
    else{
        preGuesses.push(guess);
        cleanUpGuesses(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess)
{
    if (guess < randomNumber) {
        displayMessage('Too Low...!');
    }
    else if (guess > randomNumber) {
        displayMessage('Too High...!');
    }
    else {
        displayMessage(`Congratulations! You guessed the correct number in the ${noOfGuesses} attempt!`);
        finalResult.innerHTML = `<h2>Your Score : ${lastResult}</h2>`
        endGame();
    }
}

function cleanUpGuesses(guess)
{
    userInput.value = '';
    userguesses.innerHTML += `${guess},   `;
    noOfGuesses++;
    lastResult = 100 - noOfGuesses;
}

function displayMessage(message)
{
    lowhi.innerHTML = `<h2>${message}</h2>`;
}

function endGame()
{
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    result.appendChild(p);
    playGame = false;
    newGame();
}

function newGame()
{
    const newGameButton = document.querySelector('#newGame');
    newGameButton.style.cursor = 'pointer';
    newGameButton.style.color = 'brown';
    newGameButton.addEventListener('click', (eve) =>{
        randomNumber = Math.floor(Math.random() * max);
        preGuesses = [];
        noOfGuesses = 0;
        userguesses.innerHTML = '';
        lowhi.innerHTML = '';
        finalResult.innerHTML = '';
        userInput.removeAttribute('disabled');
        result.removeChild(p);
        playGame = true;
    })
}


