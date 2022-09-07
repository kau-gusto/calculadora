import Calculator from "./classes/calculator.js";

/** @type {HTMLFormElement} */
const form = document.querySelector("form.buttons-container"),
  /** @type {HTMLDivElement} */
  last = document.querySelector("output > div.view-last"),
  /** @type {HTMLDivElement} */
  signal = document.querySelector("output > div.view-signal"),
  /** @type {HTMLDivElement} */
  now = document.querySelector("output > div.view-now"),
  /** @type {HTMLDivElement} */
  equal = document.querySelector("output > div.view-equal"),
  /** @type {HTMLDivElement} */
  result = document.querySelector("output > div.view-result");

const calculator = new Calculator();
updateCalculatorFields();

form.addEventListener("submit", (ev) => {
  const action = ev.submitter.name;
  if (calculator[action]) {
    calculator[action]();

    updateCalculatorFields();
  }
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
});

const keyMap = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  0: "zero",
  "/": "division",
  "*": "multiplication",
  "-": "subtraction",
  "+": "addition",
  ".": "dot",
  "%": "percent",
  "=": "equal",
  Enter: "equal",
};

window.addEventListener("keypress", (ev) => {
  const action = keyMap[ev.key];

  if (calculator[action]) {
    calculator[action]();
    updateCalculatorFields();
    form.querySelector(`[name=${action}]`).focus();
  }
});

function updateCalculatorFields() {
  last.textContent = calculator.last_number;
  if (calculator._defined_calc_type) {
    signal.textContent = calculator.calc_type + calculator.now_number;
    now.textContent = "";
  } else {
    signal.textContent = calculator.calc_type;
    now.textContent = calculator.now_number;
  }
  if (calculator.last_number) {
    equal.textContent = "=";
    result.textContent = calculator.calcResult();
  } else {
    equal.textContent = "";
    result.textContent = "";
  }
}
