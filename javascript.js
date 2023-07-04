let firstNum =
{
    value: '',
    isDecimal: false,
    digits: 0
};
let secondNum =
{
    value: '',
    isDecimal: false,
    digits: 0
};
let operator = '';
let pressedEquals = false;

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
        if (!firstNum.value || pressedEquals)
        {
            firstNum.value = 0;
            firstNum.digits = 1;
            pressedEquals = false;
        }
        
        firstNum.value += '.';
        firstNum.isDecimal = true;
        firstNum.digits++;
    }
    else if (!secondNum.isDecimal && operator)
    {
        if (!secondNum.value)
        {
            secondNum.value = 0;
            secondNum.digits = 1;
        }

        secondNum.value += '.';
        secondNum.isDecimal = true;
        secondNum.digits++;
    }
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
})

const equalsKey = document.querySelector('.equals');
equalsKey.addEventListener('click', () =>
{
    operate();
    pressedEquals = true;
    firstNum.isDecimal = false;
    firstNum.digits = 0;
});

const backspaceKey = document.querySelector('.backspace');
backspaceKey.addEventListener('click', backspace);

const clearKey = document.querySelector('.clear');
clearKey.addEventListener('click', clear)

function setOperator(key)
{
    if (firstNum.value && operator && secondNum.value)
    operate();

    if (secondNum.digits + firstNum.digits > 16)
    return;

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
        if (firstNum.digits >= 16)
        return;

        if (!firstNum.value || pressedEquals)
        {
            firstNum.value = dataKey;
            firstNum.digits = 1;
            pressedEquals = false;
        }
        else if (firstNum.value == '0')
        {
            if (dataKey !== '0')
            {
                firstNum.value = dataKey;
                firstNum.digits = 1;
            }
        }
        else
        {
            firstNum.value += dataKey;
            firstNum.digits++;
        }
    }
    else
    {
        if (secondNum.digits + firstNum.digits >= 16)
        return;

        if (!secondNum.value)
        {
            secondNum.value = dataKey;
            secondNum.digits = 1;
        }
        else
        {
            secondNum.value += dataKey;
            secondNum.digits++;
        }
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
        secondNum.digits--;
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
            firstNum.value = '0';
            display(`${firstNum.value} ${operator} ${secondNum.value}`);
            return;
        }
        firstNum.digits--;
    }
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
}

function clear()
{
    firstNum.value = '';
    firstNum.isDecimal = false;
    firstNum.digits = 0;
    secondNum.value = '';
    secondNum.isDecimal = false;
    secondNum.digits = 0;
    operator = '';
    pressedEquals = false;
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