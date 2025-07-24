
let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

// Map button text to calculator symbols
function getSymbol(value) {
    switch (value) {
        case 'C': return 'C';
        case '←':
        case 'larr;':
        case '←': return '←';
        case '÷':
        case '÷':
        case 'divide;':
        case '÷': return '÷';
        case '×':
        case 'times;':
        case '×': return '×';
        case '−':
        case 'minus;':
        case '−': return '-';
        case '+':
        case 'plus;':
        case '+': return '+';
        case '=':
        case 'equals;':
        case '=': return '=';
        default: return value;
    }
}

function buttonClick(value) {
    // Map HTML entity text to correct symbol
    value = value.trim();
    if (value === 'C' || value === '←' || value === '÷' || value === '×' || value === '-' || value === '+' || value === '=') {
        handleSymbol(value);
    } else if (value === '&larr;') {
        handleSymbol('←');
    } else if (value === '&divide;') {
        handleSymbol('÷');
    } else if (value === '&times;') {
        handleSymbol('×');
    } else if (value === '&minus;') {
        handleSymbol('-');
    } else if (value === '&plus;') {
        handleSymbol('+');
    } else if (value === '&equals;') {
        handleSymbol('=');
    } else if (!isNaN(value)) {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal = Math.floor(runningTotal / intBuffer); // integer division
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', function (event) {
            // Use innerText and trim spaces
            let value = event.target.innerText.trim();
            // Map HTML entities to symbols
            if (value === '←') value = '←';
            if (value === '÷') value = '÷';
            if (value === '×') value = '×';
            if (value === '−') value = '-';
            if (value === '+') value = '+';
            if (value === '=') value = '=';
            if (value === 'C') value = 'C';
            buttonClick(value);
        });
    });
}

init();