const fs = require('fs');
const path = require('path');

// Resolve the file path
const filePath = path.join(__dirname, 'input.txt');

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

console.log(JSON.stringify(array));

// Function to check if arr is ascending or descending and difference between two adjacent number is less than 3
function isSorted(arr) {
    return (arr.every(function (x, i) {
        return (i === 0 || x > arr[i - 1]); // Ascending check
    }) || arr.every(function (x, i) {
        return (i === 0 || x < arr[i - 1]);  // Descending check
    })) && arr.every(function (x, i) {
        return (i === 0 || x - arr[i - 1] <= 3);  // Difference between two adjacent numbers is less than 3 check
    }); 
}

// Apply isSorted function and count how many true
//console.log(array.map((value) => isSorted(value)));
console.log(array.map((value) => isSorted(value)).filter(Boolean).length);