// PART 1

const fs = require('fs');
const path = require('path');

// Resolve the file path
const filePath = path.join(__dirname, 'input.txt');
const filePathTest1 = path.join(__dirname, 'test-1.txt');
const filePathTest2 = path.join(__dirname, 'test-2.txt');

// Read the file
function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error('Error reading the file:', err);
        return null;
    }
}

const string = readFile(filePath);
const stringTest1 = readFile(filePathTest1);

const columnsTest = 140;
const rowsTest = 140;
// const columnsTest = 10;
// const rowsTest = 10;

const array2D = string.split('\r\n').map((el) => el.match(/.{1}/g));

let arrayCount = [];

for (let r = 0; r < rowsTest; r++) {
    for (let c = 0; c < columnsTest; c++) {
        if (array2D[r][c] == 'X') {
            // Horizontal right
            if (c + 3 < columnsTest && array2D[r][c + 1] == 'M' && array2D[r][c + 2] == 'A' && array2D[r][c + 3] == 'S') {
                arrayCount.push(true);
            }
            // Horizontal left
            if (c - 3 >= 0 && array2D[r][c - 1] == 'M' && array2D[r][c - 2] == 'A' && array2D[r][c - 3] == 'S') {
                arrayCount.push(true);
            }
            // Vertical down
            if (r + 3 < rowsTest && array2D[r + 1][c] == 'M' && array2D[r + 2][c] == 'A' && array2D[r + 3][c] == 'S') {
                arrayCount.push(true);
            }
            // Vertical up
            if (r - 3 >= 0 && array2D[r - 1][c] == 'M' && array2D[r - 2][c] == 'A' && array2D[r - 3][c] == 'S') {
                arrayCount.push(true);
            }
            // Diagonal right-down
            if (c + 3 < columnsTest && r + 3 < rowsTest && array2D[r + 1][c + 1] == 'M' && array2D[r + 2][c + 2] == 'A' && array2D[r + 3][c + 3] == 'S') {
                arrayCount.push(true);
            }
            // Diagonal right-up
            if (c + 3 < columnsTest && r - 3 >= 0 && array2D[r - 1][c + 1] == 'M' && array2D[r - 2][c + 2] == 'A' && array2D[r - 3][c + 3] == 'S') {
                arrayCount.push(true);
            }
            // Diagonal left-down
            if (c - 3 >= 0 && r + 3 < rowsTest && array2D[r + 1][c - 1] == 'M' && array2D[r + 2][c - 2] == 'A' && array2D[r + 3][c - 3] == 'S') {
                arrayCount.push(true);
            }
            // Diagonal left-up
            if (c - 3 >= 0 && r - 3 >= 0 && array2D[r - 1][c - 1] == 'M' && array2D[r - 2][c - 2] == 'A' && array2D[r - 3][c - 3] == 'S') {
                arrayCount.push(true);
            }
        }
    }
}

console.log(arrayCount.length);

// PART 2

let arrayCount2 = [];

for (let r = 0; r < rowsTest; r++) {
    for (let c = 0; c < columnsTest; c++) {
        if (array2D[r][c] == 'A') {
            // 'M' and 'M' top positions of X.
            if (r - 1 >= 0 && c - 1 >= 0 && r + 1 < rowsTest && c + 1 < columnsTest && array2D[r - 1][c - 1] == 'M' && array2D[r - 1][c + 1] == 'M' && array2D[r + 1][c - 1] == 'S' && array2D[r + 1][c + 1] == 'S') {
                arrayCount2.push(true);
            }
            // 'S' and 'S' top positions of X.
            if (r - 1 >= 0 && c - 1 >= 0 && r + 1 < rowsTest && c + 1 < columnsTest && array2D[r - 1][c - 1] == 'S' && array2D[r - 1][c + 1] == 'S' && array2D[r + 1][c - 1] == 'M' && array2D[r + 1][c + 1] == 'M') {
                arrayCount2.push(true);
            }
            // 'S' and 'M' top positions of X.
            if (r - 1 >= 0 && c - 1 >= 0 && r + 1 < rowsTest && c + 1 < columnsTest && array2D[r - 1][c - 1] == 'S' && array2D[r - 1][c + 1] == 'M' && array2D[r + 1][c - 1] == 'S' && array2D[r + 1][c + 1] == 'M') {
                arrayCount2.push(true);
            }
            // 'M' and 'S' top positions of X.
            if (r - 1 >= 0 && c - 1 >= 0 && r + 1 < rowsTest && c + 1 < columnsTest && array2D[r - 1][c - 1] == 'M' && array2D[r - 1][c + 1] == 'S' && array2D[r + 1][c - 1] == 'M' && array2D[r + 1][c + 1] == 'S') {
                arrayCount2.push(true);
            }
        }    
    }
}

console.log(arrayCount2.length);