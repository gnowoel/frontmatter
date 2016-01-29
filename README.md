# frontmatter [![Build Status](https://travis-ci.org/gnowoel/frontmatter.svg?branch=master)](https://travis-ci.org/gnowoel/frontmatter)

Parsing YAML frontmatter from a string.

## Installation

```
$ npm install frontmatter
```

## Usage

To parse the content of a string:

```
var frontmatter = require('frontmatter');
var parsed = frontmatter(content);
```

As in Jekyll, the YAML frontmatter should be delimited with triple-dash lines and defined at the beginning. For example:

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

Use the `safeLoad` option for untrusted source:

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
