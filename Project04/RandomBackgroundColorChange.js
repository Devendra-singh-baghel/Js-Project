const randomBodyColor = function () {
   
    const hexRange = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += hexRange[Math.floor(Math.random() * 16)];
    }
    return color;
};

const randomDivColor = function () {
    const hexRange = '0123456789ABCDEF'
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += hexRange[Math.floor(Math.random() * 16)];
    }
    return color;
};

let intervalId;

const startBgColorChange = function () {

    if (intervalId == null) {
        intervalId = setInterval(changBgColor, 1000);
    }
    function changBgColor() {
        document.body.style.backgroundColor = randomBodyColor();
    }
}

let intervalDivId;

const startDivColorChange = function () {

    if (intervalDivId == null) {
        intervalDivId = setInterval(changDivBgColor, 1000);
    }
    function changDivBgColor() {
        const DivColor = document.querySelector('.containor');
        DivColor.style.backgroundColor = randomDivColor();
    }
}

const stopBgColorChange = function () {

    clearInterval(intervalId);
    intervalId = null;
}

const stopDivColorChange = function () {

    clearInterval(intervalDivId);
    intervalDivId = null;
}

document.querySelector('#start').addEventListener('click', startBgColorChange);

document.querySelector('#start').addEventListener('click', startDivColorChange);

document.querySelector('#stop').addEventListener('click', stopBgColorChange);

document.querySelector('#stop').addEventListener('click', stopDivColorChange);
