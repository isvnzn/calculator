const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const topDisplay = document.querySelector(".topDisplay");
const bottomDisplay = document.querySelector(".bottomDisplay");
const equalBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const decimalBtn = document.querySelector(".decimal");
const timesBtn = document.querySelector(".times");
const divideBtn = document.querySelector(".divide");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const positiveNegativeBtn = document.querySelector(".positiveNegative");

let firstOperand = [];
let lastOperand = [];
let answer = null;
let operation = "";
let prevOperation = [];
let hasOperate = false;
let areOperatorsDisabled = false;
let isFirstOperandNegative = false;
let isLastOperandNegative = false;

topDisplay.textContent = "0";

numbers.forEach((number) => {
  number.addEventListener("click", (event) => getOperand(event));
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => getOperator(event));
});

clearBtn.addEventListener("click", () => {
  reset();
  disableOperators();
});
deleteBtn.addEventListener("click", () => delOperand());
decimalBtn.addEventListener("click", (event) => applyDecimal(event));
positiveNegativeBtn.addEventListener("click", () => togglePositiveNegative());
equalBtn.addEventListener("click", () => {
  checkOperands();
  disableOperators();
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
    answer = "Result is undefined";
  } else if (lastNumber === 0) {
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
  hasOperate = false;
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
      if (
        firstOperand.join("").includes("-") &&
        firstOperand.join("") === "-0."
      ) {
        firstOperand = [];
        topDisplay.textContent = "0";
      } else if (
        firstOperand.join("").includes("-") &&
        firstOperand.length < 3
      ) {
        firstOperand = [];
        topDisplay.textContent = "0";
      } else if (firstOperand.join("") === "0.") {
        firstOperand = [];
        topDisplay.textContent = "0";
      } else {
        firstOperand.pop();
        topDisplay.textContent = firstOperand.join("");
      }
      break;
    case lastOperand.length > 1 && firstOperand.length >= 1:
      if (
        lastOperand.join("").includes("-") &&
        lastOperand.join("") === "-0."
      ) {
        lastOperand = [0];
        bottomDisplay.textContent = "0";
      } else if (lastOperand.join("").includes("-") && lastOperand.length < 3) {
        lastOperand = [0];
        bottomDisplay.textContent = "0";
      } else {
        lastOperand.pop();
        bottomDisplay.textContent = lastOperand.join("");
      }
      break;
    case firstOperand.length <= 1 &&
      lastOperand.length < 1 &&
      topDisplay.textContent !== "0 =":
      firstOperand = [];
      topDisplay.textContent = "0";
      break;
    case lastOperand.length <= 1:
      lastOperand = [0];
      bottomDisplay.textContent = "0";
      break;
    default:
      break;
  }

  disableOperators();
};

const getOperand = (event) => {
  if (answer !== null && hasOperate === true) {
    reset();
    disableOperators();
  } else if (
    answer === "Result is undefined" ||
    answer === "Cannot divide by zero"
  ) {
    reset();
    disableOperators();
  } else if (topDisplay.textContent === "0 =") {
    reset();
  }

  switch (operation) {
    case "+":
    case "−":
    case "×":
    case "÷":
      if (event.target.value === "0" && lastOperand.length < 1) {
        bottomDisplay.textContent = "0";
      } else if (lastOperand.length === 1 && lastOperand.join("") === "0") {
        lastOperand.pop();
        lastOperand.push(event.target.value);
        bottomDisplay.textContent = lastOperand.join("");
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

    if (prevOperation[prevOperation.length - 2] !== "÷") {
      firstOperand = [answer];
    }
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
    getDisplayOnOperator();
  }

  removeFirstOperandZero();
  setDisplayOnOperator();
  disableOperators();
};

const removeFirstOperandZero = () => {
  if (firstOperand.includes(".")) {
    firstOperand = [parseFloat(firstOperand.join(""))];
  } else {
    firstOperand = [firstOperand.join("")];
  }
};

const setDisplayOnOperator = () => {
  if (answer === "Result is undefined" || answer === "Cannot divide by zero") {
    topDisplay.textContent = `${firstOperand} ${
      prevOperation[prevOperation.length - 2]
    } ${lastOperand} ${operation}`;
    bottomDisplay.textContent = answer;
  } else {
    topDisplay.textContent = `${firstOperand} ${operation}`;
    bottomDisplay.textContent = firstOperand;
  }
};

const getDisplayOnOperator = () => {
  if (firstOperand.join("") !== "0" && parseFloat(lastOperand.join("")) === 0) {
    lastOperand = [parseFloat(lastOperand.join(""))];

    if (prevOperation[prevOperation.length - 2] !== "÷") {
      firstOperand = [answer];
    }
  } else if (
    firstOperand.join("") === "0" &&
    parseFloat(lastOperand.join("")) === 0
  ) {
    lastOperand = [parseFloat(lastOperand.join(""))];
  } else {
    lastOperand = [];
    firstOperand = [answer];
  }
};

const checkOperands = () => {
  switch (true) {
    case answer === "Result is undefined" || answer === "Cannot divide by zero":
      reset();
      break;
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
      lastOperand = [firstOperand.join("")];
      break;
    case operation === "" && firstOperand.length < 1:
      firstOperand = [0];
      break;
    case operation === "" && firstOperand.length >= 1:
      firstOperand = [parseFloat(firstOperand.join(""))];
      if (parseFloat(firstOperand.join("")) !== 0) {
        answer = firstOperand;
      }
      break;
    default:
      break;
  }

  operate(+firstOperand.join(""), +lastOperand.join(""), operation);
  setDisplayOnEqual();
  hasOperate = true;
  prevOperation = [];
};

const setDisplayOnEqual = () => {
  if (operation !== "") {
    topDisplay.textContent = `${firstOperand} ${operation} ${lastOperand} =`;
    bottomDisplay.textContent = answer;
  } else if (operation === "" && areOperatorsDisabled === false) {
    topDisplay.textContent = `${firstOperand} =`;
    bottomDisplay.textContent = firstOperand;
  } else if (operation === "" && areOperatorsDisabled === true) {
    topDisplay.textContent = "0";
  } else {
    topDisplay.textContent = `${firstOperand} ${operation}`;
    bottomDisplay.textContent = firstOperand;
  }
};

const applyDecimal = (event) => {
  switch (true) {
    case firstOperand.includes(".") &&
      firstOperand.length >= 1 &&
      operation === "" &&
      hasOperate === false:
    case firstOperand.includes(".") && firstOperand.length < 1:
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
    case firstOperand.length >= 1 && lastOperand.length < 1 && operation !== "":
      lastOperand = [0];
      lastOperand.push(event.target.value);
      bottomDisplay.textContent = lastOperand.join("");
      break;
    default:
      break;
  }
};

const disableOperators = () => {
  switch (true) {
    case answer === "Cannot divide by zero" && areOperatorsDisabled === false:
    case answer === "Result is undefined" && areOperatorsDisabled === false:
      timesBtn.disabled = true;
      divideBtn.disabled = true;
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      decimalBtn.disabled = true;
      positiveNegativeBtn.disabled = true;
      areOperatorsDisabled = true;
      break;
    case areOperatorsDisabled === true:
      timesBtn.disabled = false;
      divideBtn.disabled = false;
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      decimalBtn.disabled = false;
      positiveNegativeBtn.disabled = false;
      areOperatorsDisabled = false;
      break;
    default:
      break;
  }
};

const toggleFirstOperand = () => {
  switch (true) {
    case topDisplay.textContent === "0":
    case parseFloat(firstOperand.join("")) === 0:
      break;
    case firstOperand.join("").includes("-") &&
      lastOperand.length < 1 &&
      hasOperate === false:
      firstOperand.shift();
      isFirstOperandNegative = false;
      topDisplay.textContent = firstOperand.join("");
      break;
    case !firstOperand.join("").includes("-"):
      firstOperand.unshift("-");
      isFirstOperandNegative = true;
      topDisplay.textContent = firstOperand.join("");
      break;
    default:
      break;
  }
};

const toggleLastOperand = () => {
  switch (true) {
    case bottomDisplay.textContent === "0":
    case parseFloat(lastOperand.join("")) === 0:
      break;
    case lastOperand.join("").includes("-"):
      lastOperand.shift();
      isLastOperandNegative = false;
      bottomDisplay.textContent = lastOperand.join("");
      break;
    case !firstOperand.join("").includes("-"):
      lastOperand = bottomDisplay.textContent.split("");
      lastOperand.unshift("-");
      isLastOperandNegative = true;
      bottomDisplay.textContent = lastOperand.join("");
      break;
    case firstOperand.join("").includes("-"):
      if (firstOperand.join("") === bottomDisplay.textContent) {
        lastOperand = bottomDisplay.textContent.split("").slice(1);
        isLastOperandNegative = false;
      } else {
        lastOperand.unshift("-");
        isLastOperandNegative = true;
      }

      bottomDisplay.textContent = lastOperand.join("");
      break;
    default:
      break;
  }
};

const togglePositiveNegative = () => {
  if (topDisplay.textContent.includes("=") && hasOperate === true) {
    if (answer === null) {
      firstOperand = [];
      topDisplay.textContent = "0";
    } else {
      firstOperand = answer.toString().split("");
      topDisplay.textContent = firstOperand.join("");
    }

    bottomDisplay.textContent = "";
    operation = "";
    lastOperand = [];
    answer = null;
    hasOperate = false;
    toggleFirstOperand();
  } else if (firstOperand.length >= 1 && operation === "") {
    toggleFirstOperand();
  } else if (firstOperand.length >= 1 && operation !== "") {
    toggleLastOperand();
  }
};
