export default class Calculator {
  /** @type {number | null} */
  last_number;
  /** @type {string | null} */
  _calc_type;
  /** @type {string} */
  _now_number;
  /** @type {boolean} */
  _defined_calc_type;

  get calc_type() {
    return this._calc_type;
  }

  set calc_type(symbol) {
    this._calc_type = symbol;
    this.defined_calc_type = true;
  }

  get defined_calc_type() {
    const defined_calc_type = this._defined_calc_type;
    if (defined_calc_type === true) this.defined_calc_type = false;
    return defined_calc_type;
  }

  set defined_calc_type(value) {
    this._defined_calc_type = value;
  }

  get now_number() {
    return this._now_number;
  }

  set now_number(value) {
    const temp = value.replace(/^(:?-)?0+(?!\.)/, "");
    this._now_number = temp.length ? temp : "0";
  }

  get parsed_now_number() {
    return parseFloat(this._now_number);
  }

  get signal() {
    return this._signal;
  }

  constructor(result = null) {
    this.last_number = result;
    this._calc_type = null;
    this.now_number = "0";
    this._defined_calc_type = false;
  }

  reset() {
    this.last_number = null;
    this._calc_type = null;
    this.now_number = "0";
    this._defined_calc_type = false;
  }

  resetIfCalcType() {
    if (this.defined_calc_type) {
      this.last_number = this.calcResult();
      this.now_number = "0";
    }
  }

  setCalcType(symbol) {
    this._calc_type = symbol;
    this.defined_calc_type = true;
  }

  addNewNumber(new_number) {
    this.resetIfCalcType();
    this.now_number += new_number;
  }

  calcResult() {
    if (this.last_number == null) return parseFloat(this.now_number);
    switch (this.calc_type) {
      case "/":
        return this.divResult();
      case "*":
        return this.mulResult();
      case "-":
        return this.subResult();
      case "+":
        return this.addResult();
      case "%":
        return this.perResult();

      default:
        break;
    }
  }

  divResult() {
    const result = this.last_number / this.parsed_now_number;
    return isNaN(result) ? 0 : result;
  }

  mulResult() {
    return this.last_number * this.parsed_now_number;
  }

  subResult() {
    return this.last_number - this.parsed_now_number;
  }

  addResult() {
    return this.last_number + this.parsed_now_number;
  }

  perResult() {
    return this.parsed_now_number * (this.last_number / 100);
  }

  division() {
    this.calc_type = "/";
  }

  multiplication() {
    this.calc_type = "*";
  }

  subtraction() {
    this.calc_type = "-";
  }

  addition() {
    this.calc_type = "+";
  }

  percent() {
    this.calc_type = "%";
  }

  equal() {
    this.last_number = this.calcResult();
    this.defined_calc_type = false;
  }

  c() {
    this.now_number = "0";
  }

  ce() {
    this.reset();
  }

  signal() {
    this.now_number = this.now_number.startsWith("-")
      ? this.now_number.substring(1, this.now_number.length)
      : `-${this.now_number}`;
  }

  dot() {
    if (this.defined_calc_type) {
      this.last_number = this.calcResult();
      this.now_number = "0";
    }
    this.now_number += ".";
  }

  zero() {
    this.addNewNumber("0");
  }

  one() {
    this.addNewNumber("1");
  }

  two() {
    this.addNewNumber("2");
  }

  three() {
    this.addNewNumber("3");
  }

  four() {
    this.addNewNumber("4");
  }

  five() {
    this.addNewNumber("5");
  }

  six() {
    this.addNewNumber("6");
  }

  seven() {
    this.addNewNumber("7");
  }

  eight() {
    this.addNewNumber("8");
  }

  nine() {
    this.addNewNumber("9");
  }
}
