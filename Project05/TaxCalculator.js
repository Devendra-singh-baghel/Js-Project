let income = document.querySelector('#income');
let result = document.querySelector('#tax');
let button = document.querySelector('#submit');
let addResult;

button.addEventListener('click', (e) => {

    if (result.innerHTML !== '') {
        e.preventDefault();
    }
    else {

        let incomeValue = parseFloat(income.value);

        if (isNaN(incomeValue) || incomeValue <= 0) {
            result.appendChild(document.createTextNode(`Please Enter Valid Amount.`));
        }
        else {
            let taxAmount = taxCalculator(incomeValue);
            let payableTax = Number(taxAmount.toFixed(2)).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            if (incomeValue <= 1200000) {

                result.appendChild(document.createTextNode(`Your Payable Tax Amount is : ${payableTax} ₹`));
            }
            else {
                result.appendChild(document.createTextNode(`Your Payable Tax Amount is : ${payableTax} ₹`));
            }
        }
    }

})


function taxCalculator(incomeValue) {

    let tax = 0;

    if (incomeValue <= 400000) {
        tax = 0;
    }
    else if (incomeValue <= 800000) {
        tax = (incomeValue - 400000) * 0.05;
    }
    else if (incomeValue <= 1200000) {
        tax = (400000 * 0.05) + ((incomeValue - 800000) * 0.10);
    }
    else if (incomeValue <= 1600000) {
        tax = (400000 * 0.05) + (400000 * 0.10) + ((incomeValue - 1200000) * 0.15);
    }
    else if (incomeValue <= 2000000) {
        tax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + ((incomeValue - 1600000) * 0.20);
    }
    else if (incomeValue <= 2400000) {
        tax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (400000 * 0.20) + ((incomeValue - 2000000) * 0.25);
    }
    else {
        tax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (400000 * 0.20) + (400000 * 0.25) + ((incomeValue - 2400000) * 0.30);
    }

    return tax;
}

function clearDisplay() {
    income.addEventListener('click', (e) => {
        income.value = '';
        result.innerHTML = '';
    })
}

clearDisplay();