/**
 * Deep partial mimics the behavior of `assign` values.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K]
    : T extends object
    ? DeepPartial<T[K]>
    : T[K];
};

/**
 * Simple recursive assign of objects.
 */
export function assign<T>(target: T, value: DeepPartial<T>) {
  if (target == null) return value;

  if (Array.isArray(value)) {
    if (Array.isArray(target)) {
      for (const item of value) {
        target.push(item);
      }

      return target;
    }

    return value;
  }

  if (typeof target === "object" && typeof value === "object") {
    for (const key of Object.keys(value)) {
      (target as any)[key] = assign((target as any)[key], (value as any)[key]);
    }

    return target;
  }

  return value;
}
