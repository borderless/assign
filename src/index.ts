/**
 * Deep partial mimics the behavior of `assign` values.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K]
    : T extends Record<PropertyKey, unknown>
    ? DeepPartial<T[K]>
    : T[K];
};

/**
 * Check for assignments to `Object.prototype` which would pollute globals.
 */
const hasUnsafeSetter =
  "__proto__" in Object.prototype
    ? <K extends PropertyKey>(target: Record<K, unknown>, key: K) => key === "__proto__" && target[key] === Object.prototype
    : () => false;

/**
 * Simple recursive assign of objects.
 */
export function assign<T>(target: T, value: DeepPartial<T>) {
  if (target == null) return value;

  if (Array.isArray(value)) {
    if (Array.isArray(target)) {
      for (const item of value) {
        (target as Array<unknown>).push(item);
      }

      return target;
    }

    return value;
  }

  if (typeof target === "object" && typeof value === "object") {
    for (const key of Object.keys(value)) {
      if (hasUnsafeSetter(target as Record<PropertyKey, unknown>, key)) {
        Object.defineProperty(target, key, {
          value: (value as any)[key],
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        (target as any)[key] = assign(
          (target as any)[key],
          (value as any)[key]
        );
      }
    }

    return target;
  }

  return value;
}
