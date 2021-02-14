# Assign

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Tiny, opinionated deep assign implementation.

## Installation

```sh
npm install @borderless/assign --save
```

## Usage

```js
import { assign } from "@borderless/assign";

// Merges objects.
assign({ a: 10 }, { b: 10 }); //=> { a: 10, b: 10 }

// Deep merge of objects.
assign({ a: { b: true }, { a: { c: false } }); //=> { a: { b: true, c: false } }

// Pushes to arrays, overwrites primitives.
assign({ a: 10, b: [1] }, { a: 20, b: [2, 3] }); //=> { a: 20, b: [1, 2, 3] }
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@borderless/assign.svg?style=flat
[npm-url]: https://npmjs.org/package/@borderless/assign
[downloads-image]: https://img.shields.io/npm/dm/@borderless/assign.svg?style=flat
[downloads-url]: https://npmjs.org/package/@borderless/assign
[travis-image]: https://img.shields.io/travis/borderless/assign.svg?style=flat
[travis-url]: https://travis-ci.org/borderless/assign
[coveralls-image]: https://img.shields.io/coveralls/borderless/assign.svg?style=flat
[coveralls-url]: https://coveralls.io/r/borderless/assign?branch=master
