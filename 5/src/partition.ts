
export const partition = (range: number, part: boolean[]) => {
  let min = 0;
  let max = range - 1;
  let index = 0;

  while (min !== max && index < part.length) {
    const offset = Math.floor((max - min) / 2) + 1;
    if (part[index])
      min += offset;
    else
      max -= offset;
    index++;
  }

  if (min !== max)
    return undefined;

  return min;
}