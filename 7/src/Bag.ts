import { parse } from "path";
import { inflate } from "zlib";

export interface ContainsInBag {
  id: string;
  count: number;
};

export interface Bag {
  id: string;
  contains: ContainsInBag[];
}

export const bagParse = (line: string) => {
  const split = line.split('contain');
  const idSplit = split[0].split(' ');
  const id = idSplit.slice(0, idSplit.length - 2).join(' ');

  const contains = split[1].split(',').map(c => {
    const cSplit = c.split(' ').filter(s => s.length !== 0);
    if (cSplit[0] === 'no')
      return undefined;

    const amount = parseInt(cSplit[0]);
    const cId = cSplit.slice(1, cSplit.length - 1).join(' ');

    return {
      id: cId,
      count: amount,
    }
  }).filter(c => c !== undefined) as ContainsInBag[];

  return {
    id: id,
    contains: contains
  } as Bag;
}