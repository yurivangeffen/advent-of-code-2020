import * as fs from 'fs';
import { Bag, bagParse, ContainsInBag } from './Bag';
import { flatten } from './flatten';

const inputFile = process.argv[2];

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

const bags = lines.map(line => {
  return bagParse(line);
})
const canHold : string[] = [];

const toCheck = ['shiny gold'];
while(toCheck.length > 0) {
  const check = toCheck.pop();
  const canBeHeldBy = bags.filter(bag => bag.contains.filter((contains: ContainsInBag) => contains.id === check).length > 0);

  const canBeHeldByAndIsNotChecked = canBeHeldBy.filter(bag => !canHold.includes(bag.id)).map(bag => bag.id);

  canHold.push(...canBeHeldByAndIsNotChecked);
  toCheck.push(...canBeHeldByAndIsNotChecked);
}

// FINISH
const hrend1 = process.hrtime(hrstart1);
console.info('Execution time: %ds %dms', hrend1[0], hrend1[1] / 1000000);
console.info('Answer (part 1):', canHold.length);

// START THE CLOCK!
const hrstart2 = process.hrtime()

const holds : Bag[] = [];
const toFill = [(bags.find(bag => bag.id === 'shiny gold') as Bag)];
while(toFill.length > 0) {

  const fill = toFill.pop() as Bag;
  holds.push(fill);

  const newBags = (fill.contains || []).map(c => {
    const bag = bags.find(b => b.id === c.id) as Bag;
    return Array(c.count).fill(bag);
  })

  const flattened = flatten(newBags);
  if (flattened.length > 0)
    toFill.push(...flattened);
}

console.log(holds.map(h => h.id))

// FINISH
const hrend2 = process.hrtime(hrstart2);
console.info('Execution time: %ds %dms', hrend2[0], hrend2[1] / 1000000);
console.info('Answer (part 2):', holds.length-1);