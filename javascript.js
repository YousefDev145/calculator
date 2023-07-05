let firstNum =
{
    value: '0',
    hasDecimal: false,
    digits: 0,
    isAnswer: false
};
let secondNum =
{
    value: '',
    hasDecimal: false,
    digits: 0
};
let operator = '';
let pressedKey = false;

const displayText = document.querySelector('.display-text');
displayText.textContent = '0';

const operatorKeys = document.querySelectorAll('.operator');
operatorKeys.forEach(key => key.addEventListener('click', key =>
{
    pressedKey = false;
    setOperator(key);
}));

const numberKeys = document.querySelectorAll('.number');
numberKeys.forEach(key => key.addEventListener('click', key =>
{
    pressedKey = false;
    setNumber(key);
}));

const decimalKey = document.querySelector('.decimal');
decimalKey.addEventListener('click', putDecimal)

const equalsKey = document.querySelector('.equals');
equalsKey.addEventListener('click', equals);

const backspaceKey = document.querySelector('.backspace');
backspaceKey.addEventListener('click', backspace);

const clearKey = document.querySelector('.clear');
clearKey.addEventListener('click', clear)

window.addEventListener('keydown', execute);

function execute(e)
{
    pressedKey = true;
    if(/[0-9]/.test(e.key))
    setNumber(document.querySelector(`.number[data-key="${e.key}"`));
    else if (/[+-.*./]/.test(e.key))
    setOperator(document.querySelector(`.operator[data-key="${e.key}"`));
    else if (e.key == 'Enter')
    equals();
    else if (e.key == 'Backspace')
    backspace();
}

function setOperator(key)
{
    if (firstNum.isAnswer)
    firstNum.isAnswer = false;

    if ((firstNum.value || firstNum.value == 0) && operator && secondNum.value)
    {
        if (firstNum.value == 0)
        firstNum.digits = 1;
        operate();
    }

    operator = pressedKey ? key.getAttribute('data-key') : key.target.getAttribute('data-key');
    if (operator == '*')
    operator = '×';
    else if (operator == '/')
    operator = '÷';
    
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
}

function setNumber(key)
{
    if (firstNum.isAnswer)
    clear();

    let dataKey = pressedKey ? key.getAttribute('data-key') : key.target.getAttribute('data-key');
    if (!operator)
    {
        if (firstNum.digits >= 16)
        return;

        if (firstNum.value == '0')
        {
            firstNum.value = dataKey;
            firstNum.digits = 1;
        }
        else
        {
            firstNum.value += dataKey;
            firstNum.digits++;
        }
    }
    else
    {
        if (secondNum.digits + firstNum.digits >= 17)
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

function putDecimal()
{
    if (!firstNum.hasDecimal && !(operator || secondNum.value))
    {
        if (firstNum.value == '0')
        firstNum.digits = 1;
        
        firstNum.value += '.';
        firstNum.digits++;
    }
    else if (!secondNum.hasDecimal && operator)
    {
        if (!secondNum.value)
        {
            secondNum.value = '0';
            secondNum.digits = 1;
        }

        secondNum.value += '.';
        secondNum.digits++;
    }
    firstNum.hasDecimal = firstNum.value.toString().includes('.');
    secondNum.hasDecimal = secondNum.value.includes('.');
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
}

function equals()
{
    if ((firstNum.value || firstNum.value == '0') && operator && secondNum.value)
    {
        firstNum.isAnswer = true;
        operate();
    }
    else
    operate();
}

function operate()
{
    if (!((firstNum.value || firstNum.value == '0') && operator && secondNum.value))
    return;

    firstNum.value = +firstNum.value;
    secondNum.value = +secondNum.value;

    switch (operator)
    {
        case '+':
            firstNum.value = parseFloat(add(firstNum.value, secondNum.value).toFixed(14));
        break;

        case '-':
            firstNum.value = parseFloat(subtract(firstNum.value, secondNum.value).toFixed(14));
        break;

        case '×':
            firstNum.value = parseFloat(multiply(firstNum.value, secondNum.value).toFixed(14));
        break;

        case '÷':
            if (secondNum.value == '0')
            {
                secondNum.value = '';
                clear();
                display('Cannot divide by zero!');
                return;
            }

            firstNum.value = parseFloat(divide(firstNum.value, secondNum.value).toFixed(14));
        break;
    }
    firstNum.hasDecimal = firstNum.value.toString().includes('.');
    firstNum.digits = getDigits(firstNum.value);
    secondNum.value = '';
    secondNum.hasDecimal = false;
    secondNum.digits = 0;
    operator = '';
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
    if (firstNum.digits > 16)
    {
        clear();
        display('Too large!');
    }
}

function getDigits(number)
{
    let digits = 0;
    for (i = 0; i < number.toString().length; i++)
    {
        digits++;
    }
    return digits;
}

function display(string)
{
    displayText.textContent = string;
}

function backspace()
{
    if (secondNum.value)
    {
        secondNum.value = secondNum.value.toString().slice(0, -1);
        secondNum.digits--;
    }
    else if (operator)
    {
        operator = '';
    }
    else
    {
        if (firstNum.isAnswer)
        clear();

        firstNum.value = firstNum.value.toString().slice(0, -1);

        if (firstNum.value == '')
        firstNum.value = 0;

        firstNum.digits--;
    }
    firstNum.hasDecimal = firstNum.value.toString().includes('.');
    secondNum.hasDecimal = secondNum.value.toString().includes('.');
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
}

function clear()
{
    firstNum.value = 0;
    firstNum.hasDecimal = false;
    firstNum.digits = 0;
    firstNum.isAnswer = false;
    secondNum.value = '';
    secondNum.hasDecimal = false;
    secondNum.digits = 0;
    operator = '';
    display(`${firstNum.value} ${operator} ${secondNum.value}`);
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