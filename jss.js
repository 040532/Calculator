class Calculator {
    constructor(upperDisplayElement, lowerDisplayElement) {
        this.upperDisplayElement = upperDisplayElement
        this.lowerDisplayElement = lowerDisplayElement
        this.clear()
    }

    clear() {
        this.lowerDisplay = ''
        this.upperDisplay = ''
        this.operation = undefined
    }

    delete() {
        this.lowerDisplay = this.lowerDisplay.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.lowerDisplay.includes('.')) return
        this.lowerDisplay = this.lowerDisplay.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.lowerDisplay === '') return
        if (this.upperDisplay !== '') {
            this.compute()
        }
        this.operation = operation
        this.upperDisplay = this.lowerDisplay
        this.lowerDisplay = ''
    }

    compute() {
        let result
        const prev = parseFloat(this.upperDisplay)
        const current = parseFloat(this.lowerDisplay)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '×':
                result = prev * current
                break
            case '÷':
                result = prev / current
                break
            default:
                return
        }
        this.lowerDisplay = result
        this.operation = undefined
        this.upperDisplay = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.lowerDisplayElement.innerText =
            this.getDisplayNumber(this.lowerDisplay)
        if (this.operation != null) {
            this.upperDisplayElement.innerText =
                `${this.getDisplayNumber(this.upperDisplay)} ${this.operation}`
        } else {
            this.upperDisplayElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const upperDisplayElement = document.querySelector('[data-upper-display]')
const lowerDisplayElement = document.querySelector('[data-lower-display]')

const calculator = new Calculator(upperDisplayElement, lowerDisplayElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})