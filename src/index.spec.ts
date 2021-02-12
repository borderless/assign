import { assign } from "./index";

describe("assign", () => {
  it("should merge objects", () => {
    const input: { a?: number; b?: number } = { a: 10 };
    const result = assign(input, { b: 10 });

    expect(result).toBe(input);
    expect(result).toStrictEqual({ a: 10, b: 10 });
  });

  it("should merge recursively", () => {
    const result = assign<any>(
      {
        a: {
          b: {
            c: true,
          },
        },
      },
      {
        a: {
          b: {
            c: "test",
          },
          d: 10,
        },
        e: {
          f: false,
        },
      }
    );

    expect(result).toStrictEqual({
      a: {
        b: {
          c: "test",
        },
        d: 10,
      },
      e: {
        f: false,
      },
    });
  });

  it("should merge to null object prototype", () => {
    const result = assign(Object.create(null), { prop: true });
    expect(Object.getPrototypeOf(result)).toBe(null);
    expect(JSON.stringify(result)).toStrictEqual('{"prop":true}');
  });

  it("should overwrite using custom classes", () => {
    class Test {
      prop = true;
    }
    const result = assign({}, new Test());
    expect(Object.getPrototypeOf(result)).toBe(Test.prototype);
  });

  describe("prototype pollution", () => {
    const badPayload = JSON.parse('{"__proto__":{"polluted":1}}');

    it("should not pollute object prototype", () => {
      const result = assign({}, badPayload);

      expect(result).toStrictEqual(badPayload);
      expect("polluted" in result).toBe(false);
      expect("polluted" in {}).toBe(false);
      expect(result.hasOwnProperty("__proto__")).toBe(true);
    });

    it("should allow multiple assignments", () => {
      const secondPayload = JSON.parse('{"__proto__":{"polluted":2}}');
      const result = {};

      assign(result, badPayload);
      assign(result, secondPayload);

      expect("polluted" in result).toBe(false);
      expect("polluted" in {}).toBe(false);
      expect(result).toStrictEqual(secondPayload);
      expect(result.hasOwnProperty("__proto__")).toBe(true);
    });
  });

  describe("primitives", () => {
    it("should overwrite other values", () => {
      const result = assign({ a: 10 }, { a: 20 });

      expect(result).toStrictEqual({ a: 20 });
    });
  });

  describe("arrays", () => {
    it("should append to other array", () => {
      const input: any[] = [10];
      const result = assign(input, [20]);

      expect(result).toBe(input);
      expect(result).toStrictEqual([10, 20]);
    });

    it("should overwrite non-array", () => {
      const result = assign({}, [10]);

      expect(result).toStrictEqual([10]);
    });
  });
});
