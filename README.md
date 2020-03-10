# Assign

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Tiny, opinionated deep assign implementation.

## Installation

```sh
npm install @borderlesslabs/assign --save
```

## Usage

```js
import { assign } from "@borderlesslabs/assign";

assign({ a: 10 }, { b: 10 }); // { a: 10, b: 10 }

assign({ a: { b: true }, { a: { c: false } }); // { a: { b: true, c: false } }
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@borderlesslabs/assign.svg?style=flat
[npm-url]: https://npmjs.org/package/@borderlesslabs/assign
[downloads-image]: https://img.shields.io/npm/dm/@borderlesslabs/assign.svg?style=flat
[downloads-url]: https://npmjs.org/package/@borderlesslabs/assign
[travis-image]: https://img.shields.io/travis/BorderlessLabs/assign.svg?style=flat
[travis-url]: https://travis-ci.org/BorderlessLabs/assign
[coveralls-image]: https://img.shields.io/coveralls/BorderlessLabs/assign.svg?style=flat
[coveralls-url]: https://coveralls.io/r/BorderlessLabs/assign?branch=master
