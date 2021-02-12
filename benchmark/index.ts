import { assign } from '../src';

const symbol = Symbol("test");
const start = process.hrtime();

for (let i = 0; i < 100_000; i++) {
  assign({}, {
    object: {
      property: true
    },
    array: [],
    string: "test",
    boolean: false,
    null: null,
    undefined: undefined,
    [symbol]: true,
  })
}

const end = process.hrtime(start);
console.log(`${end[0]}s ${~~(end[1] / 1000000)}ms`);
