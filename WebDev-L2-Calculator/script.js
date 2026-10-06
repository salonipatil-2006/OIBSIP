// Get display elements
const currentDisplay = document.getElementById("currentDisplay");
const previousDisplay = document.getElementById("previousDisplay");

// Get buttons
const buttons = document.querySelectorAll("button");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");


// Variables
let currentNumber = "";
let previousNumber = "";
let operator = "";


// ========================================
// NUMBER AND OPERATOR BUTTONS
// ========================================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        // Ignore special buttons
        if (
            value === "C" ||
            value === "⌫" ||
            value === "="
        ) {
            return;
        }

        // Check if button is an operator
        if (
            value === "+" ||
            value === "−" ||
            value === "×" ||
            value === "÷" ||
            value === "%"
        ) {
            chooseOperator(value);
        }

        // Number or decimal
        else {
            enterNumber(value);
        }

    });

});


// ========================================
// ENTER NUMBER
// ========================================

function enterNumber(value) {

    // Prevent multiple decimal points
    if (value === "." && currentNumber.includes(".")) {
        return;
    }

    // Prevent unnecessary leading zero
    if (currentNumber === "0" && value !== ".") {
        currentNumber = "";
    }

    currentNumber += value;

    updateDisplay();
}


// ========================================
// CHOOSE OPERATOR
// ========================================

function chooseOperator(selectedOperator) {

    // Don't allow operator without a number
    if (currentNumber === "") {
        return;
    }

    // If there is already an operation,
    // calculate it first
    if (previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;

    previousNumber = currentNumber;

    currentNumber = "";

    updateDisplay();
}


// ========================================
// CALCULATE RESULT
// ========================================

function calculate() {

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return;
    }

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "−":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":

            if (secondNumber === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operator = "";

                updateDisplay();

                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    currentNumber = result.toString();

    previousNumber = "";

    operator = "";

    updateDisplay();
}


// ========================================
// EQUAL BUTTON
// ========================================

equalsButton.addEventListener("click", () => {

    if (
        previousNumber !== "" &&
        currentNumber !== "" &&
        operator !== ""
    ) {
        calculate();
    }

});


// ========================================
// CLEAR BUTTON
// ========================================

clearButton.addEventListener("click", () => {

    currentNumber = "";
    previousNumber = "";
    operator = "";

    updateDisplay();

});


// ========================================
// DELETE BUTTON
// ========================================

deleteButton.addEventListener("click", () => {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();

});


// ========================================
// UPDATE DISPLAY
// ========================================

function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";

    if (previousNumber !== "" && operator !== "") {

        previousDisplay.textContent =
            `${previousNumber} ${operator}`;

    } else {

        previousDisplay.textContent = "";

    }

}