// PART 1

const fs = require('fs');
const path = require('path');

// Resolve the file path
const filePath = path.join(__dirname, 'input.txt');
const filePathTest = path.join(__dirname, 'test.txt');

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
const stringTest = readFile(filePathTest);

// Match any group of 1-3 digits, separated by a comma, between "mul(" and ")"
const regex = /(?<=mul\()(\d{1,3},\d{1,3})(?=\))/g;
const arrayOfMatches = (string.match(regex)).map((el) => el.split(',').map(Number));

const arrayMultiplied = arrayOfMatches.map((el => el.reduce((a , b) => a * b)));
const arraySummed = arrayMultiplied.reduce((a, b) => a + b);

console.log(arraySummed);