const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const expression = document.querySelector(".expression");
const answer = document.querySelector(".answer");
const equals = document.querySelector(".equals");

let aOperand = [0];
let bOperand = [];
let operant;

expression.textContent = aOperand;

const add = (aNum, bNum) => {
  return (answer.textContent = aNum + bNum);
};

const subtract = (aNum, bNum) => {
  return (answer.textContent = aNum - bNum);
};

const multiply = (aNum, bNum) => {
  return (answer.textContent = aNum * bNum);
};

const divide = (aNum, bNum) => {
  if (aNum === 0 && bNum === 0) {
    answer.textContent = "Result is undefined";
  } else if (bNum === 0) {
    answer.textContent = "Cannot divide by zero";
  } else {
    answer.textContent = aNum / bNum;
  }
};

const operate = (aNum, bNum, operator) => {
  switch (operator) {
    case "+":
      add(aNum, bNum);
      break;
    case "−":
      subtract(aNum, bNum);
      break;
    case "×":
      multiply(aNum, bNum);
      break;
    case "÷":
      divide(aNum, bNum);
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
    operant = event.target.value;
    expression.textContent = `${aOperand.slice(1).join("")} ${operant}`;
  });
});

const checkOperator = (event) => {
  switch (operant) {
    case "+":
    case "−":
    case "×":
    case "÷":
      bOperand.push(event.target.value);
      answer.textContent = `${bOperand.join("")}`;
      break;
    default:
      aOperand.push(event.target.value);
      expression.textContent = `${aOperand.slice(1).join("")}`;
      break;
  }
};

equals.addEventListener("click", () => {
  expression.textContent = `${aOperand
    .slice(1)
    .join("")} ${operant} ${bOperand.join("")} = `;
  operate(+aOperand.slice(1).join(""), +bOperand.join(""), operant);
});
