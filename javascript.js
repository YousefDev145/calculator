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
    display();
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
        console.log('Please enter a number before the operator.');
        return;
    }
    operator = key.target.getAttribute('data-key');
    display();
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
    display();
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

        case '*':
            firstNum.value = multiply(firstNum.value, secondNum.value).toString();
        break;

        case '/':
            firstNum.value = divide(firstNum.value, secondNum.value).toString();
        break;
    }
    secondNum.value = '';
    operator = '';
    display();
}

function display()
{
    displayText.textContent = `${firstNum.value} ${operator} ${secondNum.value}`;
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
    }
    display();
}

function clear()
{
    firstNum.value = '';
    secondNum.value = '';
    operator = '';
    displayText.textContent = '';
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