import * as fs from 'fs';
import { partition } from './partition';

const inputFile = process.argv[2];
const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const minFields = fields.length;

// Check if this file exists, else exit 1.
if (!fs.statSync(inputFile).isFile()) {
  console.error('File does not exist.');
  process.exit(1);
}
console.log('Input file:', inputFile);

// Fetch the contents of the file.
const content = fs.readFileSync(inputFile).toString("ascii");

const lines: string[] = content.split('\n').filter(line => line.length !== 0);
console.log('Line count:', lines.length);


// START THE CLOCK!
const hrstart1 = process.hrtime()

const seatIds = lines.map((line, lineIndex) => {
  const rows = line.substring(0, 7).split('').map(c => c === 'B');
  const columns = line.substring(7, line.length).split('').map(c => c === 'R');
  const row = partition(128, rows);
  const column = partition(8, columns);

  if (row === undefined || column === undefined) {
    console.log('PROBLEM:', lineIndex, rows, columns)
    return Infinity;
  }

  return row * 8 + column;
})


// FINISH
const hrend1 = process.hrtime(hrstart1);
console.info('Execution time: %ds %dms', hrend1[0], hrend1[1] / 1000000);
console.info('Answer (part 1):', Math.max(...seatIds));

// START THE CLOCK!
const hrstart2 = process.hrtime()

// Sort the list so we can see if we skipped a number somewhere.
const sorted = seatIds.sort((a, b) => a - b);
let previous : number | undefined = undefined;
let mySeat : number | undefined = undefined;
for (let i = 0; i < sorted.length; i++) {
  const current = sorted[i];
  // Check if (and only if) we skipped 1 value, if so, we found our seat in between!
  if (previous !== undefined && current === previous + 2) {
    mySeat = current - 1;
    break;
  }
  previous = current;
}

// FINISH
const hrend2 = process.hrtime(hrstart2);
console.info('Execution time: %ds %dms', hrend2[0], hrend2[1] / 1000000);
console.info('Answer (part 2):', mySeat);