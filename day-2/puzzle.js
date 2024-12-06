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

// Check if array is sorted by removing an element one by one.
function isSortedRemovingElement (arr) {
    if (isSorted(arr)) {
        return true; // If already sorted, return true
    }

    // Loop through each element, remove it, and test the resulting array
    for (let i = 0; i < arr.length; i++) {
        const arrNew = arr.toSpliced(i, 1);
        if (isSorted(arrNew)) {
            return true;
        }
    }

    return false;
}

// Counting how many arrays are rule-compliant (Safe)
//console.log(array.map((value) => removeArrIndexes(value)));
console.log(array.map((value) => isSortedRemovingElement(value)).filter(Boolean).length);