import { describe, it, expect } from "vitest";
import { isObjectShallowEqual } from "./isObjectShallowEqual";

describe("isObjectShallowEqual", () => {
  it("should return true for same object reference", () => {
    const obj = { a: 1, b: 2 };
    expect(isObjectShallowEqual(obj, obj)).toBe(true);
  });

  it("should return false for objects with different values", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    expect(isObjectShallowEqual(obj1, obj2)).toBe(false);
  });

  it("should return false for objects with different number of keys", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2, c: 3 };
    expect(isObjectShallowEqual(obj1, obj2)).toBe(false);
  });

  it("should perform shallow comparison (not deep)", () => {
    const obj1 = { a: { nested: 1 } };
    const obj2 = { a: { nested: 1 } };
    // Different object references for nested objects
    expect(isObjectShallowEqual(obj1, obj2)).toBe(false);

    const sharedNested = { nested: 1 };
    const obj3 = { a: sharedNested };
    const obj4 = { a: sharedNested };
    // Same object reference for nested objects
    expect(isObjectShallowEqual(obj3, obj4)).toBe(true);
  });
});
