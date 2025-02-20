const lights = [
    { id: 'red', color: '#c30000' , state: 'Stop'},  // Red light
    { id: 'yellow', color: '#ffff00', state: 'Ready'}, // Yellow light
    { id: 'green', color: '#009000', state: 'Go'}  // Green light
];

const resetLights = () => {
    document.querySelectorAll('.light').forEach(light => {
        light.style.backgroundColor = '#555'; // Reset to off state
    });
    document.querySelectorAll('.light').forEach(light => {
        light.innerHTML = ''; // Reset to off state
    });
};

let intervalId = null;
let currentLight = 0; // 0 = Red, 1 = Yellow, 2 = Green

const changeLight = () => {
    resetLights();
    let current = lights[currentLight];
    document.querySelector(`#${current.id}`).style.backgroundColor = current.color;
    document.querySelector(`#${current.id}`).innerHTML = current.state;
    
    // Move to the next light
    currentLight = (currentLight + 1) % lights.length;
};

const startTraffic = function () {
    if (intervalId == null) {
        changeLight(); // Start with red light
        intervalId = setInterval(changeLight, 2000); // Change light every second
    }
};

const stopTraffic = function () {
    if (intervalId != null) {
        clearInterval(intervalId);
        intervalId = null;
        resetLights(); // Turn off all lights
    }
};

document.querySelector("#start").addEventListener('click', startTraffic);
document.querySelector("#stop").addEventListener('click', stopTraffic);
