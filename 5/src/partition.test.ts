import {partition}  from './partition'; // this will be your custom import
import { expect } from 'chai';

describe('Partition tests', () => { 
  it('Checking example rows', () => { 
      // FBFBBFF
      const part = [false, true, false, true, true, false, false];
      const result = partition(128, part);
      expect(result).to.be.equal(44);
  });

  it('Checking example columns', () => { 
    // RLR
    const part = [true, false, true];
    const result = partition(8, part);
    expect(result).to.be.equal(5);
});
});
