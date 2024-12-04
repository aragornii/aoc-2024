// PART 1

const fs = require('fs');
const path = require('path');

// Resolve the file path
const filePath = path.join(__dirname, 'input.txt');
const filePathTest = path.join(__dirname, 'test.txt');

// Read the file
function readFileAndReturnArray(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('\n').map((value) => value.split(' ').map(Number));
    } catch (err) {
        console.error('Error reading the file:', err);
        return null;
    }
}

const array = readFileAndReturnArray(filePath);
const arrayTest = readFileAndReturnArray(filePathTest);

// Check if arr is ascending or descending and difference between two adjacent number is less than 3
function isSorted(arr) {
    return ((arr.every(function (x, i) {
        return (i === 0 || x > arr[i - 1]); // Ascending check
    }) || arr.every(function (x, i) {
        return (i === 0 || x < arr[i - 1]);  // Descending check
    })) && arr.every(function (x, i) {
        return (i === 0 || Math.abs(x - arr[i - 1]) <= 3);  // Difference between two adjacent numbers is less than 3 check
    })); 
}

// Counting how many arrays are rule-compliant (Safe)
// console.log((array.map((value) => isSorted(value))).length);
// console.log(JSON.stringify(array.map((value) => isSorted(value))));
console.log(array.map((value) => isSorted(value)).filter(Boolean).length);

// PART 2

// Return indexes of arr which don't comply the rule
function returnArrIndex(arr) {
    const result = [];
    const isAscending = arr[1] > arr[0]; // Determine initial direction

    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            if ((isAscending && arr[i] >= arr[i + 1]) || // Breaks ascending order
            (!isAscending && arr[i] <= arr[i + 1]) || // Breaks descending order
            Math.abs(arr[i + 1] - arr[i]) > 3) { // Difference > 3
            result.push(i);
            }
        } else {
            if ((isAscending && arr[i] <= arr[i - 1]) || // Breaks ascending order
            (!isAscending && arr[i] >= arr[i - 1]) || // Breaks descending order
            Math.abs(arr[i] - arr[i - 1]) > 3) { // Difference > 3
            result.push(i);
            }
        }   
    }
    return result;
}

// Remove element of arr not complying the rule and testing again
function removeArrIndexes (arr) {
    if (isSorted(arr)) {
        return true; // Returns true if it complies the rule
    } else {
        const indexes = returnArrIndex(arr); // Creating array of non-compliant indexes

        for (let i = 0; i < indexes.length; i++) {
            const arrNew = arr.toSpliced(indexes[i], 1); // Removing one-by-one non-compliant indexes and retesting rule

            if(isSorted(arrNew)) {
                return true;
            }
        }
        return false;
    }
}

// Counting how many arrays are rule-compliant (Safe)
//console.log(array.map((value) => removeArrIndexes(value)));
console.log(array.map((value) => removeArrIndexes(value)).filter(Boolean).length);