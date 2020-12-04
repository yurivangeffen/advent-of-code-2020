import * as fs from 'fs';

const inputFile = process.argv[2];

// Check if this file exists, else exit 1.
if (!fs.statSync(inputFile).isFile()) {
  console.error('File does not exist.');
  process.exit(1);
}
console.log('Input file:', inputFile);

// Fetch the contents of the file.
const content = fs.readFileSync(inputFile).toString("ascii");

interface Policy {
  min: number;
  max: number;
  character: string;
  password: string;
}

const policies : Policy[] = content.split('\n').filter(l => l.length > 0).map((line: string) => {
  const parts = line.split(' ');
  const minMax = parts[0].split('-').map(number => parseInt(number));
  const character = parts[1][0];
  const password = parts[2];

  return {
    min: minMax[0],
    max: minMax[1],
    character,
    password
  };
});

console.log('Line count:', policies.length);

// START THE CLOCK!
var hrstart = process.hrtime()

// For each policy we check the amount of occurences of the character (count),
// if the count is outside [min,max] we filter the policy out.
const valid = policies.filter(p => {
  let count = 0;
  for (let i = 0; i < p.password.length; i++) {
    const c = p.password[i];
    if (c === p.character) 
      count++;
  }
  return count >= p.min && count <= p.max;
})

// FINISH
const hrend = process.hrtime(hrstart);
console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
console.info('Answer:', valid.length);