let firstNum =
{
    value: '',
    isDecimal: false
};
let secondNum =
{
    value: '',
    isDecimal: false
};
let operator = '';

const displayText = document.querySelector('.display-text');
displayText.textContent = '0';

const operatorKeys = document.querySelectorAll('.operator');
operatorKeys.forEach(key => key.addEventListener('click', setOperator));

const numberKeys = document.querySelectorAll('.number');
numberKeys.forEach(key => key.addEventListener('click', setNumber));

const decimalKey = document.querySelector('.decimal');
decimalKey.addEventListener('click', () =>
{
    if (!firstNum.isDecimal && !(operator && secondNum.value))
    {
        if (!firstNum.value)
        firstNum.value = 0;
        
        firstNum.value += '.';
        firstNum.isDecimal = true;
    }
    else if (!secondNum.isDecimal && operator)
    {
        if (!secondNum.value)
        secondNum.value = 0;

        secondNum.value += '.';
        secondNum.isDecimal = true;
    }
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
})

const equalsKey = document.querySelector('.equals');
equalsKey.addEventListener('click', operate);

const backspaceKey = document.querySelector('.backspace');
backspaceKey.addEventListener('click', backspace);

const clearKey = document.querySelector('.clear');
clearKey.addEventListener('click', clear)

function setOperator(key)
{
    if (firstNum.value && operator && secondNum.value)
    operate();

    if (!firstNum.value)
    {
        display('Please enter a number before the operator.');
        return;
    }
    operator = key.target.getAttribute('data-key');
    if (operator == '*')
    operator = '×';
    else if (operator == '/')
    operator = '÷';
    
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
}

function setNumber(key)
{
    let dataKey = key.target.getAttribute('data-key');
    if (!operator)
    {
        if (!firstNum.value)
        firstNum.value = dataKey;
        else
        firstNum.value += dataKey;
    }
    else
    {
        if (!secondNum.value)
        secondNum.value = dataKey;
        else
        secondNum.value += dataKey;
    }
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
}

function operate()
{
    if (!(firstNum.value && operator && secondNum.value))
    return;

    firstNum.value = +firstNum.value;
    secondNum.value = +secondNum.value;

    switch (operator)
    {
        case '+':
            firstNum.value = add(firstNum.value, secondNum.value).toString();
        break;

        case '-':
            firstNum.value = subtract(firstNum.value, secondNum.value).toString();
        break;

        case '×':
            firstNum.value = multiply(firstNum.value, secondNum.value).toString();
        break;

        case '÷':
            if (secondNum.value == 0)
            {
                secondNum.value = '';
                display('Cannot divide by zero!');
                return;
            }

            firstNum.value = divide(firstNum.value, secondNum.value);
        break;
    }
    secondNum.value = '';
    operator = '';
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
}

function display(string)
{
    displayText.textContent = string;
}

function backspace()
{
    if (secondNum.value)
    {
        if (secondNum.value.slice(-1) == '.')
        secondNum.isDecimal = false;

        secondNum.value = secondNum.value.slice(0, -1);
    }
    else if (operator)
    {
        operator = '';
    }
    else
    {
        if (firstNum.value.slice(-1) == '.')
        firstNum.isDecimal = false;

        firstNum.value = firstNum.value.slice(0, -1);
        if (firstNum.value == '')
        {
            display('0');
            return;
        }
    }
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
}

function clear()
{
    firstNum.value = '';
    secondNum.value = '';
    operator = '';
    display('0');
}

function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return a / b;
}