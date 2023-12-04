const fs = require('node:fs');
const filePath = '../aoc-2023/day_3/input.txt';


const sumOfNumbers = (input) => {
    const regex = /[*%@#+$\-=/&]/;

    let sum = 0;
    let initialArr = splitStringInto2DCharArr(input); // O(n)

    for (let rowIndex = 0; rowIndex < initialArr.length; rowIndex++) {
        for (let charIndex = 0; charIndex < initialArr[rowIndex].length; charIndex++) { // O(n*m)

            const char = initialArr[rowIndex][charIndex];
            if (regex.test(char)) {
                if (initialArr[rowIndex - 1] !== undefined) {

                    const topLeftAndRight = iterateRow(initialArr[rowIndex - 1], charIndex);

                    sum = sum + topLeftAndRight;
                }

                const middleLeftAndRight = iterateRow(initialArr[rowIndex], charIndex)
                sum = sum + middleLeftAndRight;

                if (initialArr[rowIndex + 1] !== undefined) {

                    const bottomLeftAndRight = iterateRow(initialArr[rowIndex + 1], charIndex);

                    sum = sum + bottomLeftAndRight;
                }
                
            }
        }
    }
    return sum;
};

const mergeAndSumNumbers = (arr) => {
    let mergedNumber = "";
    let totalSum = 0;

    arr.forEach(element => {
        if (!isNaN(element)) {
            mergedNumber += element;
        } else {

            if (mergedNumber !== "") {
                totalSum += parseInt(mergedNumber);
                mergedNumber = "";
            }
        }
    });

    if (mergedNumber !== "") {
        totalSum += parseInt(mergedNumber);
    }

    return totalSum;
}

const iterateRow = (rowArr, columnPos) => {
    let digitArr = [rowArr[columnPos]];
    for (let i = columnPos - 1; i >= 0; i--) {
        if (isDigit(rowArr[i])) {
            digitArr.unshift(rowArr[i]);
            continue;
        }
        else {
            break;
        }
    }
    for (let j = columnPos + 1; j <= rowArr.length; j++) {
        if (isDigit(rowArr[j])) {
            digitArr.push(rowArr[j]);
            continue;
        }
        break;
    }
    return mergeAndSumNumbers(digitArr);
};



const splitStringInto2DCharArr = (inputString) => {
    const columnSize = 140;

    const characters = inputString.split('');
    const resultArray = [];
    for (let i = 0; i < characters.length; i += columnSize) {
        const row = characters.slice(i, i + columnSize);
        resultArray.push(row);
    }
    return resultArray;
};

const isDigit = (str) => {
    return !isNaN(parseFloat(str)) && isFinite(str);
};


try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(sumOfNumbers(data));
} catch (err) {
    console.error(err);
}
