import { question } from 'readline-sync'

type Operator = "+" | "-" | "*" | "/"

const main = (): void => {

    const firstString: string = question("Enter first number:\n")
    const operator: string = question("Enter operator:\n")    
    const secondString: string = question("Enter second number:\n")

    const validInput: boolean = isNumber(firstString) && isOperator(operator) && isNumber(secondString)

    if(validInput){
        const firstNum: number = parseInt(firstString) 
        const secondNum: number = parseInt(secondString)
        const result = calculate(firstNum, operator as Operator, secondNum)
        console.log(`${firstNum} ${operator} ${secondNum} = ${result}`);
        
    }else {
        console.log("\n Invalid Input");
        main()
    }
    
}

const calculate = (firstNum: number, operator: Operator, secondNum: number): number => {

    switch (operator) {
        case "+":
            return firstNum + secondNum
        case "-":
            return firstNum - secondNum
        case "*":
            return firstNum * secondNum
        case "/": 
            return firstNum / secondNum
        default:
            return 0
    }
}

const isNumber = (str: string): boolean => {
    const maybeNum = parseInt(str)
    const isNum: boolean = !isNaN(maybeNum) 
    return isNum
}

const isOperator = (operator: string): boolean => {
    switch (operator) {
        case "+":
        case "-":
        case "*":
        case "/":
         return true
        default:
            return false
    }
}
main()