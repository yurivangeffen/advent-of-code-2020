import * as fs from 'fs';

const inputFile = process.argv[2];
const sumToFind = 2020;

// Check if this file exists, else exit 1.
if (!fs.statSync(inputFile).isFile()) {
  console.error('File does not exist.');
  process.exit(1);
}
console.log('Input file:', inputFile);

// Fetch the contents of the file.
const content = fs.readFileSync(inputFile).toString("ascii");
let numbers = content.split('\n').map(line => parseInt(line));

console.log('Line count:', numbers.length);

// START THE CLOCK!
var hrstart = process.hrtime()

// We want to do a prefilter on numbers that MUST be too big, for that we need the smallest number:
const smallest = numbers.reduce((prev, curr) => {
  if (prev > curr) 
    return curr;
  return prev;
}, Infinity);

// The minimum size a number should have to be relevant is 2020 - smallest:
const minimalSize = sumToFind - smallest;

// Naive filter to exclude numbers that are too small:
numbers = numbers.filter(n => n <= minimalSize)

// Match numbers, check their sum, break if we found a sum of 2020:
let A, B;
for (let i = 0; i < numbers.length; i++) {
  const a = numbers[i];
  const found = numbers.find(b => a + b === sumToFind);
  if (found !== undefined) {
    A = a;
    B = found;
    break;
  }
}

// FINISH
const hrend = process.hrtime(hrstart)
console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000)

if (A !== undefined && B !== undefined) {
  console.info('Found an answer: ', A, '*', B, '=', A*B);
} else {
  console.warn('No answer found.')
}