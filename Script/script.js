let currentInput = "";
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

const buttons = document.querySelectorAll('.btn, .btnOp');
const calculatorScreen = document.querySelector('.calculatorScreen');

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    'x': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
};

function handleNumber(num) {
    if (waitingForSecondOperand) {
        currentInput = "";
        waitingForSecondOperand = false;
    }
    currentInput += num;
}

function handleOperator(op) {
    if (firstOperand === null) {
        firstOperand = Number(currentInput);
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, Number(currentInput));
        currentInput = String(result);
        firstOperand = result;
    }
    operator = op;
    waitingForSecondOperand = true;
}

function equals() {
    if (operator && firstOperand !== null) {
        currentInput = String(performCalculation[operator](firstOperand, Number(currentInput)));
        firstOperand = null;
        operator = null;
    }
}

function clear() {
    currentInput = "";
    firstOperand = null;
    operator = null;
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const text = button.textContent;
        if (text >= '0' && text <= '9' || text === '.') {
            handleNumber(text);
        } else if (text === 'C') {
            clear();
        } else if (text === '=') {
            equals();
        } else if (text === '<') {
            backspace();
        } else {
            handleOperator(text);
        }
        calculatorScreen.textContent = currentInput;
    });
});