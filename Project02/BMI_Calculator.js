const form = document.querySelector('form');

form.addEventListener('submit', (action) =>{
    action.preventDefault();

    const height = parseInt(document.querySelector('#height').value);
    const weight = parseInt(document.querySelector('#weight').value);
    const result = document.querySelector('#result');
    const suggetion = document.querySelector('#suggetion');
    

    if(height === '' || height < 0 || isNaN(height))
    {
        result.innerHTML = (`Plese inpute valid height!`);
    }
    else if(weight === '' || weight < 0 || isNaN(weight))
    {
        result.innerHTML = (`Plese inpute valid weight!`);
    }
    else
    {
        const BMI = (weight / ((height * height) / 10000)).toFixed(2);

        result.innerHTML = `<span>${BMI}</span>`;

        if(BMI < 18.6)
        {
            suggetion.innerHTML = 'You Are Under Weight! 😒 Kuchh Khaya-Piya Karo!';
            suggetion.style.color = 'red';
        }
        else if(BMI > 18.6 && BMI < 24.9)
        {
            suggetion.innerHTML = 'You Are Healthy! 🫠 Lage Raho!';
            suggetion.style.color = 'green';
        }
        else{
            suggetion.innerHTML = 'You Are Over Weight! 🤡 Ab To Gym Chale Jao!';
            suggetion.style.color = 'red';
        }
    }
})
