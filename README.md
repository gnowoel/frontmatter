# frontmatter [![Build Status](https://travis-ci.org/gnowoel/frontmatter.svg?branch=master)](https://travis-ci.org/gnowoel/frontmatter)

A simple YAML frontmatter parser.

## Installation

```
$ npm install frontmatter
```

## Usage

To parse the YAML frontmatter from a string:

```javascript
var frontmatter = require('frontmatter');
var parsed = frontmatter(string);
```
The YAML frontmatter should be defined at the beginning of the string, within a pair of triple-dash lines. For example:

```gfm
---
title: Welcome
---

Hello!
```

In this case, the `parsed` object would be:

```json
{
  "data": {
    "title": "Welcome"
  },
  "content": "\nHello!\n"
}
```

For untrusted source, the `safeLoad` option should be used:

```javascript
frontmatter(content, { safeLoad: true });
```

## Tests

```
$ npm install
$ npm test
```

## License

MIT
