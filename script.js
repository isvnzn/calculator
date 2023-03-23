const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const expression = document.querySelector(".expression");
const answer = document.querySelector(".answer");
const equals = document.querySelector(".equals");

let firstOperand = [];
let lastOperand = [];

let operation;

expression.textContent = "0";

const add = (firstNumber, lastNumber) => {
  return (answer.textContent = firstNumber + lastNumber);
};

const subtract = (firstNumber, lastNumber) => {
  return (answer.textContent = firstNumber - lastNumber);
};

const multiply = (firstNumber, lastNumber) => {
  return (answer.textContent = firstNumber * lastNumber);
};

const divide = (firstNumber, lastNumber) => {
  if (firstNumber === 0 && lastNumber === 0) {
    answer.textContent = "Result is undefined";
  } else if (lastNumber === 0) {
    answer.textContent = "Cannot divide by zero";
  } else {
    answer.textContent = firstNumber / lastNumber;
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

numbers.forEach((number) => {
  number.addEventListener("click", (event) => getOperand(event));
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => getOperator(event));
});

equals.addEventListener("click", () => checkOperands());

const getOperand = (event) => {
  switch (operation) {
    case "+":
    case "−":
    case "×":
    case "÷":
      if (lastOperand.length < 1 && event.target.value === "0") {
        answer.textContent = "0";
      } else {
        lastOperand.push(event.target.value);
        answer.textContent = lastOperand.join("");
      }
      break;
    default:
      if (firstOperand.length < 1 && event.target.value === "0") {
      } else {
        firstOperand.push(event.target.value);
        expression.textContent = firstOperand.join("");
      }
      break;
  }
};

const getOperator = (event) => {
  operation = event.target.value;

  if (firstOperand.length === 0) {
    firstOperand = [0];
  }

  expression.textContent = `${firstOperand.join("")} ${operation}`;
  answer.textContent = firstOperand.join("");
};

const checkOperands = () => {
  switch (true) {
    case firstOperand.length < 1:
      expression.textContent = "0 =";
      answer.textContent = "0";
      break;
    case firstOperand.length >= 1 &&
      lastOperand.length < 1 &&
      operation === undefined:
      expression.textContent = `${firstOperand.join("")} =`;
      answer.textContent = firstOperand.join("");
      break;
    case firstOperand.length >= 1 &&
      lastOperand.length >= 1 &&
      operation !== undefined:
      expression.textContent = `${firstOperand.join(
        ""
      )} ${operation} ${lastOperand.join("")} =`;
      break;
    case firstOperand.length >= 1 &&
      lastOperand.length < 1 &&
      operation !== undefined:
      lastOperand = firstOperand;
      expression.textContent = `${firstOperand.join(
        ""
      )} ${operation} ${lastOperand.join("")} =`;
      break;
    default:
      break;
  }

  operate(+firstOperand.join(""), +lastOperand.join(""), operation);
};
