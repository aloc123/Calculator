const buttons = document.querySelector(".button-container");
const buttonMap = {
    "00": "CLR",
    "01": "DEL",
    "02": "%",
    "03": "/",
    "10": "1",
    "11": "2",
    "12": "3",
    "13": "*",
    "20": "4",
    "21": "5",
    "22": "6",
    "23": "-",
    "30": "7",
    "31": "8",
    "32": "9",
    "33": "+",
    "40": "0",
    "41": "=",
};
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const edits = ["CLR", "DEL"];
const operatorsList = ["*", "/", "+", "-", "=", "%"];
const operatorsSeries = ["*", "/", "+", "-", "%"];

function operate(op1, op2, operator){
    if (operator === "+") return +op1 + +op2;
    else if (operator === "-") return +op1 - +op2;
    else if (operator === "*") return +op1 * +op2;
    else if (operator === "/"){
        if (+op2 === 0) return "Math Error!";
        else return +op1 / +op2;
    }
    else if (operator === "%") return +op1 % +op2;
}

//create 3 row
for (let i = 0; i < 5; i++){
    const row = document.createElement("div");
    row.style.cssText = "display: flex; flex-direction: row; justify-content: space-between; border-style: none; border-color: black; flex: 1;";
    row.classList.add("row-buttons");  
    //add buttons with proper label
    let columns = 4;
    if (i === 4) columns = 2;
    for (let index = 0; index < columns; index++){
        const button = document.createElement("button");
        button.style.cssText = "flex: 1; border-style: solid; border-radius: 4px; margin: 5px;"
        button.textContent = buttonMap[i.toString() + index.toString()];
        button.classList.add(`${i.toString() + index.toString()}`);
        row.appendChild(button);
    }
    buttons.appendChild(row);
}

//when pressing a button display the button pressed
//when typing/pressing numbers, if overwrite, CLEAR first then set overwrite to zero, populate the screen afterwards
const screen = document.querySelector(".screen-container");
const buttonsList = document.querySelectorAll("button");
let overwrite = false;
let operand1 = undefined;
let operator = undefined;
let operand2 = undefined;
const MAX_LENGTH = 10;

buttonsList.forEach((btn) => {
    //when clicked, check if button is a number, operator, or editor 
    btn.addEventListener("click", (event) => {
        const btnPressed = buttonMap[btn.className];
        if (numbers.includes(btnPressed)){
            if (overwrite) {
                screen.textContent = "";
                overwrite = false;
            }
            screen.textContent += btnPressed;
        }

        else if (operatorsList.includes(btnPressed)){
        //logic of operators
            //alert(`I pressed the ${btnPressed} operator`);
            //alert(`operand1 === undefined? ${operand1 === undefined} btnPressed === "="? ${btnPressed === "="}`);
            //alert(`operator !== undefined || screen.textContent === ""? ${operator !== undefined || screen.textContent === ""}`);
            console.log(`operator !== undefined && screen.textContent === ""? ${operator !== undefined && screen.textContent === ""}`);
            console.log(`operand1 === undefined? ${operand1 === undefined}`);
            console.log(`operand1 !== undefined? ${operand1 !== undefined}`);
            if (operator !== undefined && screen.textContent === ""){
                if (operand1 === undefined) {}
                else{
                    if (btnPressed === "="){
                        screen.textContent === "";
                    }
                    else{
                        operator = btnPressed;
                        overwrite = true;
                    }
                }
            }
            else if (operand1 === undefined){
                if (btnPressed === "="){
                    operand1 = undefined;
                    operator = undefined;
                    operand2 = undefined;
                }
                else{
                    operator = btnPressed;
                    operand1 = screen.textContent;
                }
                overwrite = true;
            }
            else if (operand1 !== undefined){ //operand1 is defined here so we do the operation
                operand2 = screen.textContent;
                let result = operate(operand1, operand2, operator);
                if (result.toString().length > MAX_LENGTH) screen.textContent = result.toPrecision(MAX_LENGTH);
                else screen.textContent = result;
                overwrite = true;
                operand2 = undefined;
                operator = undefined;
                if (operatorsSeries.includes(btnPressed)){
                    operand1 = result;
                    operator = btnPressed;
                }
                else operand1 = undefined;
            }
        }

        else if (edits.includes(btnPressed)){
            if (btnPressed === "CLR") screen.textContent = "";
            else screen.textContent = screen.textContent.slice(0, -1); 
        }
    });
});