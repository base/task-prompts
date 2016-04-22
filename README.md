# task-prompts [![NPM version](https://img.shields.io/npm/v/task-prompts.svg?style=flat)](https://www.npmjs.com/package/task-prompts) [![NPM downloads](https://img.shields.io/npm/dm/task-prompts.svg?style=flat)](https://npmjs.org/package/task-prompts) [![Build Status](https://img.shields.io/travis/node-base/task-prompts.svg?style=flat)](https://travis-ci.org/node-base/task-prompts)

> User prompts for conditionally running tasks.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install task-prompts --save
```

## Usage

**Heads up!** This is not a plugin, but the main export is a function that takes an instance of `base` and an options object. Requires the [base-task](https://github.com/node-base/base-task) and [base-questions](https://github.com/node-base/base-questions) plugins to be registered first.

```js
var prompts = require('task-prompts');
var questions = require('base-questions');
var task = require('base-task');
var Base = require('base');
var app = new Base();

var ask = prompts(app);
app.use(questions());
app.use(task());
```

## Examples

**Conditionally run tasks**

To run this example, you will also need to use the [base-npm](https://github.com/jonschlinkert/base-npm) plugin.

```js
var npm = require('base-npm');
app.use(npm());

// run `a` if truthy, otherwise `b`
app.task('foo', ask.confirm('Want to install `foo`?', ['a'], ['b']));
```

**Conditionally call functions**

To run this example, you will also need to use the [base-npm](https://github.com/jonschlinkert/base-npm) plugin.

```js
// calls the `yes` function if the answer is truthy, otherwise `no`
app.task('basic', prompt.confirm('Want to do stuff?', yes, no));

function yes(cb) {
  console.log('yes!');
  cb();
}

function no(cb) {
  console.log('no!');
  cb();
}
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/task-prompts/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/node-base/task-prompts/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on April 22, 2016._