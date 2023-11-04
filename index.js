const valueElement = document.querySelector('.value');
const acElement = document.querySelector('.ac');
const pmElement = document.querySelector('.pm');
const percentElement = document.querySelector('.percent');
const additionElement = document.querySelector('.addition');
const subtractionElement = document.querySelector('.subtraction');
const multiplicationElement = document.querySelector('.multiplication');
const divisionElement = document.querySelector('.division');
const equalElement = document.querySelector('.equal');
const decimalElement = document.querySelector('.decimal');
const number0Element = document.querySelector('.number-0');
const number1Element = document.querySelector('.number-1');
const number2Element = document.querySelector('.number-2');
const number3Element = document.querySelector('.number-3');
const number4Element = document.querySelector('.number-4');
const number5Element = document.querySelector('.number-5');
const number6Element = document.querySelector('.number-6');
const number7Element = document.querySelector('.number-7');
const number8Element = document.querySelector('.number-8');
const number9Element = document.querySelector('.number-9');
const numberElementArray = [
  number0Element, number1Element, number2Element, number3Element, number4Element,
  number5Element, number6Element, number7Element, number8Element, number9Element
];

let valueStrInMemory = null;
let operatorInMemory = null;

const getValueAsStr = () => valueElement.textContent.split(',').join('');

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === '.') {
    valueElement.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    valueElement.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    valueElement.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  if (currentValueStr === '0') {
    setStrAsValue(numStr);
  } else {
    setStrAsValue(currentValueStr + numStr);
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
};

acElement.addEventListener('click', () => {
  setStrAsValue('0');
  valueStrInMemory = null;
  operatorInMemory = null;
});

pmElement.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === '-0') {
    setStrAsValue('0');
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue('-' + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
});
percentElement.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

additionElement.addEventListener('click', () => {
  handleOperatorClick('addition');
});
subtractionElement.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});
multiplicationElement.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});
divisionElement.addEventListener('click', () => {
  handleOperatorClick('division');
});
equalElement.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});

for (let index = 0; index < numberElementArray.length; index++) {
  const numberElement = numberElementArray[index];
  numberElement.addEventListener('click', () => {
    handleNumberClick(index.toString());
  });
}
decimalElement.addEventListener('click', () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {
    setStrAsValue(currentValueStr + '.');
  }
});