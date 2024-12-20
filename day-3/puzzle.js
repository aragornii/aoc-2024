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
const stringTest2 = readFile(filePathTest2);

// Match any group of 1-3 digits, separated by a comma, between "mul(" and ")"
const regex = /(?<=mul\()(\d{1,3},\d{1,3})(?=\))/g;
const arrayOfMatches = (string.match(regex)).map((el) => el.split(',').map(Number));

const arrayMultiplied = arrayOfMatches.map((el => el.reduce((a , b) => a * b)));
const arraySummed = arrayMultiplied.reduce((a, b) => a + b);

console.log(arraySummed);

// PART 2

// Regex to find string between "don't()" and "do()"
const regexPart2 = /don't\(\).*?do\(\)/g;

// Create first array of matches
let arrayofMarchesPart2 = string.split(regexPart2).filter(Boolean);

// Regex to find "don't()" without a following "do()"
const regexRemoveAfterLastDont = /don't\(\)(?!.*do\(\)).*/;

// Remove for each array element anything after the last "don't()" if no "do()" exists
arrayofMarchesPart2 = arrayofMarchesPart2.map(element => {
    if (regexRemoveAfterLastDont.test(element)) {
      return element.replace(regexRemoveAfterLastDont, '');
    }
    return element; // Return the element unchanged if the condition is not met
});

const arrayofMarchesPart2Bis = (arrayofMarchesPart2.map((el => (el.match(regex)).map((el) => el.split(',').map(Number))))).flat(1);
const arrayMultipliedPart2 = arrayofMarchesPart2Bis.map((el => el.reduce((a , b) => a * b)));
const arraySummedPart2 = arrayMultipliedPart2.reduce((a, b) => a + b);

console.log(arraySummedPart2);