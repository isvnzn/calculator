const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const topDisplay = document.querySelector(".topDisplay");
const bottomDisplay = document.querySelector(".bottomDisplay");
const equalBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const decimalBtn = document.querySelector(".decimal");

let firstOperand = [];
let lastOperand = [];
let answer = null;
let operation = "";
let prevOperation = [];
let hasOperate = false;

topDisplay.textContent = "0";

numbers.forEach((number) => {
  number.addEventListener("click", (event) => getOperand(event));
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => getOperator(event));
});

clearBtn.addEventListener("click", () => reset());
deleteBtn.addEventListener("click", () => delOperand());
decimalBtn.addEventListener("click", (event) => applyDecimal(event));
equalBtn.addEventListener("click", () => checkOperands());

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
    // answer = 0;
    answer = "Result is undefined";
  } else if (lastNumber === 0) {
    // answer = 0;
    answer = "Cannot divide by zero";
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
  topDisplay.textContent = "0";
  bottomDisplay.textContent = "";
};

const delOperand = () => {
  switch (true) {
    case firstOperand.length >= 1 &&
      lastOperand.length >= 1 &&
      answer !== null &&
      hasOperate === true:
    case answer === "Cannot divide by zero" || answer === "Result is undefined":
      reset();
      break;
    case operation === "" && firstOperand.length >= 1 && answer !== null:
    case operation !== "" && firstOperand.length >= 1 && lastOperand.length < 1:
      break;
    case firstOperand.length > 1 && lastOperand.length < 1:
      firstOperand.pop();
      topDisplay.textContent = firstOperand.join("");
      break;
    case lastOperand.length > 1 && firstOperand.length >= 1:
    case firstOperand[0] === 0 && lastOperand.length > 1:
      lastOperand.pop();
      bottomDisplay.textContent = lastOperand.join("");
      break;
    case firstOperand.length <= 1 &&
      lastOperand.length < 1 &&
      topDisplay.textContent !== "0 =":
      topDisplay.textContent = "0";
      firstOperand = [];
      break;
    case lastOperand.length <= 1:
      bottomDisplay.textContent = "0";
      lastOperand = [];
      break;
    default:
      break;
  }
};

const getOperand = (event) => {
  if (answer !== null && hasOperate === true) {
    reset();
  } else if (
    answer === "Result is undefined" ||
    answer === "Cannot divide by zero"
  ) {
    reset();
  } else if (topDisplay.textContent === "0 =") {
    reset();
  }

  switch (operation) {
    case "+":
    case "−":
    case "×":
    case "÷":
      if (lastOperand.length <= 1 && event.target.value === "0") {
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

const getOperator = (event) => {
  operation = event.target.value;
  prevOperation.push(operation);

  if (firstOperand.length < 1) {
    firstOperand = [0];
  } else if (
    bottomDisplay.textContent === "0" &&
    topDisplay.textContent !== "0 ="
  ) {
    lastOperand = [0];
    operate(
      +firstOperand.join(""),
      +lastOperand.join(""),
      prevOperation[prevOperation.length - 2]
    );
  } else if (answer !== null && hasOperate === true) {
    lastOperand = [];
    firstOperand = [answer];
    hasOperate = false;
  } else if (firstOperand.length >= 1 && lastOperand.length >= 1) {
    operate(
      +firstOperand.join(""),
      +lastOperand.join(""),
      prevOperation[prevOperation.length - 2]
    );

    if (
      firstOperand.join("") !== "0" &&
      parseFloat(lastOperand.join("")) === 0
    ) {
      lastOperand = [parseFloat(lastOperand.join(""))];
    } else if (
      firstOperand.join("") === "0" &&
      parseFloat(lastOperand.join("")) === 0
    ) {
      lastOperand = [parseFloat(lastOperand.join(""))];
    } else {
      lastOperand = [];
      firstOperand = [answer];
    }
  }

  //remove non leading zeros
  if (firstOperand.includes(".")) {
    firstOperand = [parseFloat(firstOperand.join(""))];
  } else {
    firstOperand = [firstOperand.join("")];
  }

  //handle display
  if (
    firstOperand.length >= 1 &&
    parseFloat(lastOperand.join("")) === 0 &&
    bottomDisplay.textContent !== "0"
  ) {
    topDisplay.textContent = `${firstOperand} ${
      prevOperation[prevOperation.length - 2]
    } ${lastOperand} ${operation}`;
    bottomDisplay.textContent = answer;
  } else if (
    firstOperand.length >= 1 &&
    bottomDisplay.textContent === "0" &&
    topDisplay.textContent !== "0 ="
  ) {
    topDisplay.textContent = `${firstOperand} ${operation} ${lastOperand} =`;
    bottomDisplay.textContent = answer;
  } else {
    topDisplay.textContent = `${firstOperand} ${operation}`;
    bottomDisplay.textContent = firstOperand;
  }
};

const checkOperands = () => {
  switch (true) {
    case operation !== "" &&
      firstOperand.length >= 1 &&
      lastOperand.length >= 1:
      if (lastOperand.includes(".")) {
        firstOperand = [parseFloat(firstOperand.join(""))];
        lastOperand = [parseFloat(lastOperand.join(""))];
      } else {
        firstOperand = [firstOperand.join("")];
        lastOperand = [lastOperand.join("")];
      }
      break;
    case operation !== "" && bottomDisplay.textContent === "0":
      lastOperand = [0];
      break;
    case operation !== "" && lastOperand.length < 1:
      lastOperand = firstOperand;
      break;
    case operation === "" && firstOperand.length < 1:
      firstOperand = [0];
      break;
    case operation === "" && firstOperand.length >= 1:
      firstOperand = [parseFloat(firstOperand.join(""))];
      answer = firstOperand;
      break;
    default:
      break;
  }

  operate(+firstOperand.join(""), +lastOperand.join(""), operation);
  //handle display
  if (operation !== "") {
    topDisplay.textContent = `${firstOperand} ${operation} ${lastOperand} =`;
    bottomDisplay.textContent = answer;
  } else if (operation === "") {
    topDisplay.textContent = `${firstOperand} =`;
    bottomDisplay.textContent = firstOperand;
  } else {
    topDisplay.textContent = `${firstOperand} ${operation}`;
    bottomDisplay.textContent = firstOperand;
  }

  hasOperate = true;
  prevOperation = [];
};

const applyDecimal = (event) => {
  switch (true) {
    case firstOperand.includes(".") &&
      firstOperand.length >= 1 &&
      operation === "" &&
      hasOperate === false:
    case lastOperand.includes(".") && operation !== "":
      break;
    case topDisplay.textContent === "0 =":
    case answer !== null && hasOperate === true:
      reset();
      hasOperate = false;
      firstOperand = [0];
      firstOperand.push(event.target.value);
      topDisplay.textContent = firstOperand.join("");
      break;
    case firstOperand.length >= 1 && operation === "" && hasOperate === false:
      firstOperand.push(event.target.value);
      topDisplay.textContent = firstOperand.join("");
      break;
    case lastOperand.length < 1 && operation === "" && hasOperate === false:
      firstOperand = [0];
      firstOperand.push(event.target.value);
      topDisplay.textContent = firstOperand.join("");
      break;
    case firstOperand.length >= 1 &&
      lastOperand.length >= 1 &&
      operation !== "":
      lastOperand.push(event.target.value);
      bottomDisplay.textContent = lastOperand.join("");
      break;
    case firstOperand.length >= 1 && operation !== "":
    case firstOperand.length >= 1 && hasOperate === true:
      lastOperand = [0];
      lastOperand.push(event.target.value);
      bottomDisplay.textContent = lastOperand.join("");
      break;
    default:
      break;
  }
};
