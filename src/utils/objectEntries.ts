/**
 * Returns an array of key–value pairs from an object, with **type-safe inference** for both keys and values.
 *
 * This is a strongly typed wrapper around `Object.entries`, ensuring that
 * the returned tuples preserve the original object's key and value types
 * instead of defaulting to `(string, any)`.
 *
 * @template T - The object type to extract entries from
 * @param {T} obj - The source object to get entries for
 * @returns {[keyof T, T[keyof T]][]} An array of `[key, value]` tuples preserving the key and value types of `T`
 *
 * @example
 * const hero = { str: 10, int: 8, agi: 6 };
 * const entries = objectEntries(hero);
 * // entries: [['str', 10],['int', 8],['agi', 6]]
 *
 */
export function objectEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
