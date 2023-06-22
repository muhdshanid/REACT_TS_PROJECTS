"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_sync_1 = require("readline-sync");
var main = function () {
    var firstString = (0, readline_sync_1.question)("Enter first number:\n");
    var operator = (0, readline_sync_1.question)("Enter operator:\n");
    var secondString = (0, readline_sync_1.question)("Enter second number:\n");
    var validInput = isNumber(firstString) && isOperator(operator) && isNumber(secondString);
    if (validInput) {
        var firstNum = parseInt(firstString);
        var secondNum = parseInt(secondString);
        var result = calculate(firstNum, operator, secondNum);
        console.log("".concat(firstNum, " ").concat(operator, " ").concat(secondNum, " = ").concat(result));
    }
    else {
        console.log("\n Invalid Input");
        main();
    }
};
var calculate = function (firstNum, operator, secondNum) {
    switch (operator) {
        case "+":
            return firstNum + secondNum;
        case "-":
            return firstNum - secondNum;
        case "*":
            return firstNum * secondNum;
        case "/":
            return firstNum / secondNum;
        default:
            return 0;
    }
};
var isNumber = function (str) {
    var maybeNum = parseInt(str);
    var isNum = !isNaN(maybeNum);
    return isNum;
};
var isOperator = function (operator) {
    switch (operator) {
        case "+":
        case "-":
        case "*":
        case "/":
            return true;
        default:
            return false;
    }
};
main();
