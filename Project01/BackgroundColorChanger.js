const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');

buttons.forEach(function (button) {

    button.addEventListener('click', function (event) {

        if (event.target.id === 'yellow') {
            body.style.backgroundColor = event.target.id;
        }
        else if (event.target.id === 'red') {
            body.style.backgroundColor = event.target.id;
        }
        else if (event.target.id === 'black') {
            body.style.backgroundColor = event.target.id;
        }
        else if (event.target.id === 'purple') {
            body.style.backgroundColor = event.target.id;
        }
        else if (event.target.id === 'palegreen') {
            body.style.backgroundColor = event.target.id;
        }
        else if (event.target.id === 'lightblue') {
            body.style.backgroundColor = event.target.id;
        }
        else if (event.target.id === 'pink') {
            body.style.backgroundColor = event.target.id;
        }
        else if (event.target.id === 'blue') {
            body.style.backgroundColor = event.target.id;
        }
        else{
            alert('Please click on the right box.')
        }
    })
})