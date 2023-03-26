const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const topDisplay = document.querySelector(".topDisplay");
const bottomDisplay = document.querySelector(".bottomDisplay");
const equals = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");

let firstOperand = [];
let lastOperand = [];
let answer = null;
let operation = "";
let hasOperate = false;

topDisplay.textContent = "0";

numbers.forEach((number) => {
  number.addEventListener("click", (event) => getOperand(event));
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => getOperator(event));
});

equals.addEventListener("click", () => checkOperands());

clearBtn.addEventListener("click", () => {
  reset();
  topDisplay.textContent = "0";
  bottomDisplay.textContent = "";
});

const add = (firstNumber, lastNumber) => {
  answer = firstNumber + lastNumber;
  bottomDisplay.textContent = answer;
};

const subtract = (firstNumber, lastNumber) => {
  answer = firstNumber - lastNumber;
  bottomDisplay.textContent = answer;
};

const multiply = (firstNumber, lastNumber) => {
  answer = firstNumber * lastNumber;
  bottomDisplay.textContent = answer;
};

const divide = (firstNumber, lastNumber) => {
  if (firstNumber === 0 && lastNumber === 0) {
    answer = 0;
    bottomDisplay.textContent = "Result is undefined";
  } else if (lastNumber === 0) {
    answer = 0;
    bottomDisplay.textContent = "Cannot divide by zero";
  } else {
    answer = firstNumber / lastNumber;
    bottomDisplay.textContent = answer;
  }
};

const operate = (firstNumber, lastNumber, operator) => {
  switch (operator) {
    case "+":
      add(firstNumber, lastNumber);
      break;
    case "−":
      subtract(firstNumber, lastNumber);
      break;
    case "×":
      multiply(firstNumber, lastNumber);
      break;
    case "÷":
      divide(firstNumber, lastNumber);
      break;
    default:
      break;
  }
};

const reset = () => {
  firstOperand = [];
  lastOperand = [];
  operation = "";
  answer = null;
};

const getOperand = (event) => {
  if (answer !== null && hasOperate === true) {
    reset();
    bottomDisplay.textContent = "";
  }

  switch (operation) {
    case "+":
    case "−":
    case "×":
    case "÷":
      if (lastOperand.length < 1 && event.target.value === "0") {
        bottomDisplay.textContent = "0";
      } else {
        lastOperand.push(event.target.value);
        bottomDisplay.textContent = lastOperand.join("");
      }
      break;
    default:
      if (firstOperand.length < 1 && event.target.value === "0") {
        topDisplay.textContent = "0";
      } else {
        firstOperand.push(event.target.value);
        topDisplay.textContent = firstOperand.join("");
      }
      break;
  }
};

const getOperator = (event) => {
  operation = event.target.value;

  if (firstOperand.length === 0) {
    firstOperand = [0];
  } else if (answer !== null) {
    lastOperand = [];
    firstOperand = [answer];
    topDisplay.textContent = `${firstOperand.join("")} ${operation}`;
    hasOperate = false;
  }

  topDisplay.textContent = `${firstOperand.join("")} ${operation}`;
  bottomDisplay.textContent = firstOperand.join("");
};

const checkOperands = () => {
  switch (true) {
    case firstOperand.length < 1:
      answer = 0;
      topDisplay.textContent = "0 =";
      bottomDisplay.textContent = answer;
      break;
    case firstOperand.length >= 1 && lastOperand.length < 1 && operation === "":
      answer = firstOperand.join("");
      topDisplay.textContent = `${answer} =`;
      bottomDisplay.textContent = answer;
      break;
    case firstOperand.length >= 1 &&
      lastOperand.length >= 1 &&
      operation !== "":
      topDisplay.textContent = `${firstOperand.join(
        ""
      )} ${operation} ${lastOperand.join("")} =`;
      break;
    case bottomDisplay.textContent === "0":
      lastOperand.push(0);
      topDisplay.textContent = `${firstOperand.join(
        ""
      )} ${operation} ${lastOperand.join("")} =`;
      break;
    case firstOperand.length >= 1 && lastOperand.length < 1 && operation !== "":
      lastOperand = firstOperand;
      topDisplay.textContent = `${firstOperand.join(
        ""
      )} ${operation} ${lastOperand.join("")} =`;
      break;
    default:
      break;
  }

  operate(+firstOperand.join(""), +lastOperand.join(""), operation);
  hasOperate = true;
};
