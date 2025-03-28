let right = document.querySelector("#right");
let left = document.querySelector("#left");
let containor = document.querySelector(".containor");
let slides = document.querySelectorAll(".slide")
let indicator = document.querySelectorAll(".dot");
let mainBox = document.querySelector(".main-box");

let currentSlideID = 0;

function showImg() {
    if (currentSlideID >= slides.length) {
        currentSlideID = 0;
    } else if (currentSlideID < 0) {
        currentSlideID = slides.length - 1;
    }

    containor.style.transform = `translateX(-${currentSlideID * 100}%)`;
    updateIndicator();
}

function updateIndicator() {
    indicator.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlideID);
    });
}

right.addEventListener('click', () => {
    currentSlideID++;
    showImg();
});

left.addEventListener('click', () => {
    currentSlideID--;
    showImg();
});

let intervalId = setInterval(function () {
    currentSlideID++;
    showImg();
}, 2000);

mainBox.addEventListener('mouseenter', function () {
    clearInterval(intervalId);
    right.style.display = "initial";
    left.style.display = "initial";
})

mainBox.addEventListener('mouseleave', function () {
    right.style.display = "none";
    left.style.display = "none";
    intervalId = setInterval(function () {
        currentSlideID++;
        showImg();
    }, 2000);
})


