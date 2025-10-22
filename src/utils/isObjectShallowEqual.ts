/**
 * Performs a **shallow equality comparison** between two plain objects.
 *
 * It checks whether both objects have:
 * - The same set of keys
 * - The same corresponding values (using strict equality `===`)
 *
 * Note: This function does **not** perform deep comparison — nested objects or arrays
 * will only be compared by reference.
 *
 * @template T - The object type extending Record<string, unknown>
 * @param {T} a - The first object to compare
 * @param {T} b - The second object to compare
 * @returns {boolean} `true` if both objects are shallowly equal, otherwise `false`
 *
 * @example
 *
 * isObjectShallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
 * isObjectShallowEqual({ a: 1 }, { a: 1, b: 2 });       // false
 * isObjectShallowEqual({ a: { x: 1 } }, { a: { x: 1 } }); // false (different refs)
 *
 */

export function isObjectShallowEqual<T extends Record<string, unknown>>(a: T, b: T): boolean {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || a == null || b == null) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (a[key as keyof T] !== b[key as keyof T]) return false;
  }
  return true;
}
