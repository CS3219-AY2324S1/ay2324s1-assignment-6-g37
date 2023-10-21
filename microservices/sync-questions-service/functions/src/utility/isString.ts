/**
 * Checks that the input is a string. 
 *
 * @param unknown Possibly a string.
 * @returns True if input is a string, false otherwise. 
 */
export function isString(
  unknown: unknown,
): unknown is string {
  return typeof unknown === 'string';
}
