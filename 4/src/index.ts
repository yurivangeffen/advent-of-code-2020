import * as fs from 'fs';

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

const lines: string[] = content.split('\n');
console.log('Line count:', lines.length);

// START THE CLOCK!
var hrstart = process.hrtime()

const passports = new Array<string>();

// Convert passports to a 1-liner:
let currentPassport = '';
lines.forEach(l => {
  if (l.length === 0) {
    if (currentPassport.length !== 0)
      passports[passports.length] = currentPassport;
    currentPassport = '';
  }
  currentPassport += (currentPassport.length !== 0 ? ' ': '') + l;
})

// Split each passport out in it's respective keys:
const passportFields = passports.map(p1 => p1.split(' ').map(p2 => p2.split(':')[0]));

const valid = passportFields.filter(passport => {
  if (passport.length < minFields)
    return false;
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (!passport.includes(field))
      return false;    
  }
  return true;
})

// FINISH
const hrend = process.hrtime(hrstart);
console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
console.info('Answer:', valid.length);