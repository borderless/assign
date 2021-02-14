/**
 * Deep partial mimics the behavior of `assign` values.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends unknown[]
    ? T[K]
    : T extends Record<PropertyKey, unknown>
    ? DeepPartial<T[K]>
    : T[K];
};

/**
 * Make `Object.prototype.hasOwnProperty` a reusable utility function.
 */
const hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

/**
 * Check if `value` is a simple object.
 */
const isObject = (value: unknown): value is Record<PropertyKey, unknown> => {
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
};

/**
 * Check for assignments to `Object.prototype` which would pollute globals.
 *
 * Node.js 13+ has a `--disable-proto=delete` method, which means we can skip
 * this check in the right environment.
 */
const hasUnsafeSetter =
  "__proto__" in Object.prototype
    ? <K extends PropertyKey>(target: Record<K, unknown>, key: K) =>
        key === "__proto__" && target[key] === Object.prototype
    : () => false;

/**
 * Simple recursive assign of objects.
 */
export function assign<T>(target: T, value: DeepPartial<T>): DeepPartial<T> {
  if (Array.isArray(value)) {
    if (Array.isArray(target)) {
      for (const item of value) {
        (target as Array<unknown>).push(item);
      }

      return target;
    }

    return value;
  } else if (isObject(value)) {
    if (isObject(target)) {
      for (const key of Object.keys(value)) {
        if (hasOwnProperty(target, key)) {
          (target as any)[key] = assign(
            (target as any)[key],
            (value as any)[key]
          );
        } else if (hasUnsafeSetter(target, key)) {
          Object.defineProperty(target, key, {
            value: (value as any)[key],
            enumerable: true,
            configurable: true,
            writable: true,
          });
        } else {
          (target as any)[key] = (value as any)[key];
        }
      }

      return target;
    }
  }

  return value;
}
