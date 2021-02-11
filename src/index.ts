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

function isProtoPath(path: any, key: string) {
  return path[key] === Object.prototype;
}

/**
 * Simple recursive assign of objects.
 */
export function assign<T>(target: T, value: DeepPartial<T>) {
  if (target == null) return value;

  if (Array.isArray(value)) {
    if (Array.isArray(target)) {
      for (const item of value) {
        (target as Array<string>).push(item);
      }

      return target;
    }

    return value;
  }

  if (typeof target === "object" && typeof value === "object") {
    for (const key of Object.keys(value)) {
      if (isProtoPath(target, key)) {
        target = Object.defineProperty(target, key, {
          value: (value as any)[key]
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
