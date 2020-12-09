// Filters an array on unique elements.
// Note: only use with basic types, objects are not sorted properly
// due to the dependence on Array.indexOf.
export function filterUnique<T>(toSort: T[]) {
  return toSort.filter(
    (current, index) => toSort.indexOf(current) === index
  );
}