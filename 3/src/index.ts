import * as fs from 'fs';

const inputFile = process.argv[2];
const offsetPerRidge = 3;

// Check if this file exists, else exit 1.
if (!fs.statSync(inputFile).isFile()) {
  console.error('File does not exist.');
  process.exit(1);
}
console.log('Input file:', inputFile);

// Fetch the contents of the file.
const content = fs.readFileSync(inputFile).toString("ascii");

const landscape: boolean[][] = content.split('\n').map((line: string) => {
  const ridge = new Array<boolean>();
  for (let i = 0; i < line.length; i++) {
    const element = line[i];
    ridge[i] = element === '#';
  }
  return ridge;
});

console.log('Line count:', landscape.length);

// START THE CLOCK!
var hrstart = process.hrtime()

const ridgesWhereIHitATree = landscape.filter((ridge, i) => {
  const offset = (i * offsetPerRidge) % ridge.length;
  return ridge[offset];
})

// FINISH
const hrend = process.hrtime(hrstart);
console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
console.info('Answer:', ridgesWhereIHitATree.length);