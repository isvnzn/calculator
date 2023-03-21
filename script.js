let aOperand = 0;
let bOperand = 0;
let operator;

const add = (aNum, bNum) => {
  return aNum + bNum;
};

const subtract = (aNum, bNum) => {
  return aNum - bNum;
};

const multiply = (aNum, bNum) => {
  return aNum * bNum;
};

const divide = (aNum, bNum) => {
  return aNum / bNum;
};

const operate = (aNum, bNum, operator) => {
  switch (operator) {
    case "+":
      add(aNum, bNum);
      break;
    case "-":
      subtract(aNum, bNum);
      break;
    case "*":
      multiply(aNum, bNum);
      break;
    case "/":
      divide(aNum, bNum);
      break;
    default:
      console.log("Something went wrong.");
      break;
  }
};
