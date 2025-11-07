const buttons = document.querySelector(".button-container");
const buttonMap = {
    "00": "CLR",
    "01": "DEL",
    "02": "%",
    "03": "/",
    "10": "1",
    "11": "2",
    "12": "3",
    "13": "X",
    "20": "4",
    "21": "5",
    "22": "6",
    "23": "-",
    "30": "7",
    "31": "8",
    "32": "9",
    "33": "+",
    "40": "0",
    "41": ".",
    "42": "+/-",
    "43": "=",
};
//create 3 row
for (let i = 0; i < 5; i++){
    const row = document.createElement("div");
    row.style.cssText = "display: flex; flex-direction: row; justify-content: space-between; border-style: none; border-color: black; flex: 1;";
    row.classList.add("row-buttons");  
    //add buttons with proper label
    for (let index = 0; index < 4; index++){
        const button = document.createElement("button");
        button.style.cssText = "flex: 1; border-style: solid; border-radius: 4px; margin: 5px;"
        button.textContent = buttonMap[i.toString() + index.toString()];
        button.classList.add(`${i.toString() + index.toString()}`);
        row.appendChild(button);
    }
    buttons.appendChild(row);
}

const screen = document.querySelector(".screen-container");
const buttonsList = document.querySelectorAll("button");
buttonsList.forEach((btn) => {
    //add eventlistener, when clicked, gets the class name then appends the corresponding key to the screen
    btn.addEventListener("click", (event) => {
        screen.textContent += buttonMap[btn.className];
    });
});