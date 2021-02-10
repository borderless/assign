import { assign } from "./index";

describe("assign", () => {
  it("should merge object and keep identity", () => {
    const input: { a?: number; b?: number } = { a: 10 };
    const result = assign(input, { b: 10 });

    expect(result).toBe(input);
    expect(result).toStrictEqual({ a: 10, b: 10 });
  });

  it("should append array and keep identity", () => {
    const input: any[] = [10];
    const result = assign(input, [20]);

    expect(result).toBe(input);
    expect(result).toStrictEqual([10, 20]);
  });

  it("should overwrite primitive types", () => {
    const result = assign({ a: 10 }, { a: 20 });

    expect(result).toStrictEqual({ a: 20 });
  });

  it("array should overwrite non-array", () => {
    const result = assign({}, [10]);

    expect(result).toStrictEqual([10]);
  });

  it("should merge deep", () => {
    const result = assign<any>(
      {
        a: {
          b: {
            c: true
          }
        }
      },
      {
        a: {
          b: {
            c: "test"
          },
          d: 10
        },
        e: {
          f: false
        }
      }
    );

    expect(result).toStrictEqual({
      a: {
        b: {
          c: "test"
        },
        d: 10
      },
      e: {
        f: false
      }
    });
  });

  it("should ignore when unsafe path encountered", () => {
    const payload = { __proto__: { polluted: "Yes! Its Polluted" } };
    expect(assign({}, payload)).toStrictEqual({});
  });
});
