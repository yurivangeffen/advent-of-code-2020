import * as fs from 'fs';
import { filterUnique } from './filterUnique';

const inputFile = process.argv[2];

// Check if this file exists, else exit 1.
if (!fs.statSync(inputFile).isFile()) {
  console.error('File does not exist.');
  process.exit(1);
}
console.log('Input file:', inputFile);

// Fetch the contents of the file.
const content = fs.readFileSync(inputFile).toString("ascii");

const lines: string[] = content.split('\n');
console.log('Line count:', lines.length);

// START THE CLOCK!
const hrstart1 = process.hrtime()

const groups : string[] = [];
let group = 0;
lines.forEach(line => {
  if (line.length === 0) 
    group++;
  else {
    if (groups[group] === undefined)
      groups[group] = line;
    else
      groups[group] += line;
  }
});
console.log('Group count:', groups.length);

const groupCounts = groups.map(g => filterUnique(g.split('')).length);

// FINISH
const hrend1 = process.hrtime(hrstart1);
console.info('Execution time: %ds %dms', hrend1[0], hrend1[1] / 1000000);
console.info('Answer (part 1):', groupCounts.reduce((prev, curr) => prev + curr, 0));
