const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const expression = document.querySelector(".expression");
const answer = document.querySelector(".answer");
const equals = document.querySelector(".equals");

let firstOperand = [0];
let lastOperand = [];
let firstObject = [];
let lastObject = [];

let operation;

expression.textContent = firstOperand;

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
      console.log("Something went wrong.");
      break;
  }
};

numbers.forEach((number) => {
  number.addEventListener("click", (event) => checkOperator(event));
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    operation = event.target.value;
    if (firstOperand.length < 2) {
      expression.textContent = `${firstOperand[0]} ${operation}`;
    } else {
      expression.textContent = `${firstObject} ${operation}`;
    }
  });
});

const checkOperator = (event) => {
  switch (operation) {
    case "+":
    case "−":
    case "×":
    case "÷":
      lastOperand.push(event.target.value);
      lastObject = lastOperand.join("");
      answer.textContent = `${lastObject}`;
      break;
    default:
      firstOperand.push(event.target.value);
      firstObject = firstOperand.slice(1).join("");
      expression.textContent = `${firstObject}`;
      break;
  }
};

equals.addEventListener("click", () => checkOperands());

const checkOperands = () => {
  switch (true) {
    case +firstObject >= 1 &&
      lastOperand.length === 0 &&
      operation === undefined:
      expression.textContent = `${firstOperand
        .slice(1)
        .join("")} = ${firstOperand.slice(1).join("")} `;
      break;
    case +firstObject >= 1 && lastOperand.length === 0:
      lastObject = firstOperand.slice(1).join("");
      expression.textContent = `${firstOperand
        .slice(1)
        .join("")} ${operation} ${lastObject} = `;
      break;
    case firstOperand[0] === 0 && operation === undefined:
      expression.textContent = `${firstOperand[0]} = ${firstOperand[0]}`;
      break;
    case firstOperand[0] === 0 &&
      lastOperand.length === 0 &&
      operation !== undefined:
      expression.textContent = `${firstOperand[0]} ${operation} ${firstOperand[0]} = `;
      break;
    case firstOperand[0] === 0 && operation !== undefined:
      expression.textContent = `${firstOperand[0]} ${operation} ${lastObject} = `;
      break;
    default:
      expression.textContent = `${firstObject} ${operation} ${lastObject} = `;
      break;
  }

  operate(+firstObject, +lastObject, operation);
};
