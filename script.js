const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const topDisplay = document.querySelector(".topDisplay");
const bottomDisplay = document.querySelector(".bottomDisplay");
const equals = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

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

deleteBtn.addEventListener("click", () => delOperand());

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

const delOperand = () => {
  if (
    firstOperand.length >= 1 &&
    lastOperand.length >= 1 &&
    answer !== null &&
    hasOperate == true
  ) {
    reset();
    topDisplay.textContent = "0";
    bottomDisplay.textContent = "";
  } else if (operation === "" && firstOperand.length >= 1 && answer !== null) {
    //do nothing
  } else if (
    operation !== "" &&
    firstOperand.length >= 1 &&
    lastOperand.length < 1
  ) {
    //do nothing
  } else if (firstOperand.length > 1 && lastOperand.length < 1) {
    firstOperand.pop();
    topDisplay.textContent = firstOperand.join("");
  } else if (lastOperand.length > 1 && firstOperand.length >= 1) {
    lastOperand.pop();
    bottomDisplay.textContent = lastOperand.join("");
  } else if (firstOperand[0] === 0 && lastOperand.length > 1) {
    lastOperand.pop();
    bottomDisplay.textContent = lastOperand.join("");
  } else if (
    firstOperand.length <= 1 &&
    lastOperand.length < 1 &&
    topDisplay.textContent !== "0 ="
  ) {
    topDisplay.textContent = "0";
    firstOperand = [];
  } else if (lastOperand.length <= 1) {
    bottomDisplay.textContent = "0";
    lastOperand = [];
  }
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

  hasOperate = false;
};

let old = [];
const getOperator = (event) => {
  operation = event.target.value;
  old.push(operation);
  console.log(old);
  if (firstOperand.length === 0) {
    firstOperand = [0];
  } else if (answer !== null && hasOperate === true) {
    lastOperand = [];
    firstOperand = [answer];
    topDisplay.textContent = `${firstOperand.join("")} ${operation}`;
    hasOperate = false;
  }

  bottomDisplay.textContent = firstOperand.join("");
  topDisplay.textContent = `${firstOperand.join("")} ${operation}`;

  let prevOperation = old[old.length - 2];
  if (firstOperand.length >= 1 && lastOperand.length >= 1) {
    operate(+firstOperand.join(""), +lastOperand.join(""), prevOperation);
    topDisplay.textContent = `${answer} ${operation}`;
    firstOperand = [answer];
    lastOperand = [];
  }
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
