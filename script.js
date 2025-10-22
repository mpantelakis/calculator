const EQUAL = "\u003D";
const PLUS = "\u002B";
const MINUS = "\u2212";
const MULTIPLICATION = "\u00D7";
const DIVISION = "\u00F7";
const DOT = ".";

let n1 = "";
let n2 = "";
let operator;
let operatorPressed = false;
let equalPressed = false;
let result;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) return "Division by 0";
  return a / b;
}

function operate(n1, n2, op) {
  if (op == PLUS) return add(n1, n2);
  else if (op == MINUS) return subtract(n1, n2);
  else if (op == MULTIPLICATION) return multiply(n1, n2);
  else if (op == DIVISION) return divide(n1, n2);
}

function clear() {
  screenResult.textContent = "";
  screenOperation.textContent = "";
  n1 = "";
  n2 = "";
  operator = "";
  operatorPressed = false;
  equalPressed = false;
  dotPressed = false;
}

function deleteInput() {
  console.log(n1);
  console.log(n2);
  if (n1 != "" && n2 == "") {
    n1 = n1.substring(0, n1.length - 1);
    screenResult.textContent = n1;
  } else if (n1 != "" && n2 != "") {
    n2 = n2.substring(0, n2.length - 1);
    screenResult.textContent = n2;
  }
}

const screenResult = document.querySelector(".result");
const screenOperation = document.querySelector(".operation");

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => clear());

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => deleteInput());

const numberButtons = document.querySelectorAll("#number");

const operationButtons = document.querySelectorAll("#operator");

for (button of numberButtons)
  button.addEventListener("click", (e) => {
    if (screenResult.textContent == "Not allowed") clear();
    if (operatorPressed) {
      n2 += e.target.textContent;
      screenResult.textContent = n2;
    } else {
      n1 += e.target.textContent;
      screenResult.textContent = n1;
    }
  });

for (button of operationButtons)
  button.addEventListener("click", (e) => {
    if (
      (e.target.textContent == EQUAL && !operatorPressed) ||
      (e.target.textContent == EQUAL && n2 == "")
    ) {
      equalPressed = false;
    } else if (e.target.textContent == DOT) {
      if (operatorPressed && n2 != "" && !n2.includes(".")) {
        n2 += e.target.textContent;
        screenResult.textContent = n2;
      } else if (n1 != "" && !n1.includes(".")) {
        n1 += e.target.textContent;
        screenResult.textContent = n1;
      }
    } else if (e.target.textContent == DOT && dotPressed) {
      return;
    } else if (e.target.textContent == EQUAL && operatorPressed) {
      console.log(n1);
      result = operate(Number(n1), Number(n2), operator);
      if (result == "Division by 0") {
        screenResult.textContent = "Not allowed";
        return;
      } else
        result =
          Math.round(operate(Number(n1), Number(n2), operator) * 100) / 100;
      screenResult.textContent = result;
      screenOperation.textContent = `${Number(n1)} ${operator} ${Number(n2)} =`;
      operatorPressed = false;
      equalPressed = true;
      dotPressed = false;
      n1 = "";
      n2 = "";
    } else if (operatorPressed && e.target.textContent != EQUAL && n2 != "") {
      if (result == "Division by 0") {
        screenResult.textContent = "Not allowed";
        return;
      } else
        result =
          Math.round(operate(Number(n1), Number(n2), operator) * 100) / 100;
      operator = e.target.textContent;
      screenResult.textContent = result;
      screenOperation.textContent = `${result} ${operator}`;
      n1 = result;
      n2 = "";
    } else if (equalPressed && n2 == "") {
      n1 = result;
      screenOperation.textContent = "";
      operator = e.target.textContent;
      operatorPressed = true;
      equalPressed = false;
    } else if (operatorPressed && n2 == "") {
      if (operator != e.target.textContent) {
        operator = e.target.textContent;
        screenOperation.textContent = `${result} ${operator}`;
      }
    } else {
      operator = e.target.textContent;
      operatorPressed = true;
    }
  });
