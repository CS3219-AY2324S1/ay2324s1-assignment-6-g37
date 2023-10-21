/**
 * Checks that the input is an array and every element in the array satisfies the given predicate. 
 *
 * @param array Possibly an array.
 * @param checkType Predicate to check each element in the array.
 * @returns True if input is an array and each element in the array satisfies the given predicate. 
 */
export function isArrayOfType<T>(
  array: unknown,
  checkType: (unknown: unknown) => unknown is T
): array is T[] {
  if (!Array.isArray(array)) {
    return false;
  }
  for (let unknown of array) {
    if (!checkType(unknown)) {
      return false;
    }
  }
  return true;
}