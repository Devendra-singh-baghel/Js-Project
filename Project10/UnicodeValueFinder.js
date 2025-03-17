let input = document.querySelector("input");
    let button = document.querySelector("button");
    let output = document.querySelector("p");

    function getUnicodeValue(){
        if(input.value){
            let char = input.value.trim();
            let unicode = char.codePointAt(0);
            output.textContent = `Unicode Value Of  "${char}"   is "${unicode}"  .`;
        }else{
            output.textContent = "Please Enter a Character or Symbole!";
        }
    }

    function clearDisplay(){
        input.value = "";
        output.textContent = "";
    }
    button.addEventListener('click', getUnicodeValue);
    input.addEventListener('click', clearDisplay);
        