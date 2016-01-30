var yaml = require('js-yaml');

var pattern = /(^-{3}(?:\r\n|\r|\n)([\w\W]*?)-{3}(?:\r\n|\r|\n))?([\w\W]*)*/;

module.exports = function(string, opts) {
  opts = opts || {};

  var parsed = {
    data: null,
    content: ''
  }

  var matches = string.match(pattern);

  if (matches[2] !== undefined) {
    var parse = opts.safeLoad ? yaml.safeLoad : yaml.load;

    try {
      parsed.data = parse(matches[2]) || {};
    } catch(err) {
      throw err;
    }
  }

  if (matches[3] !== undefined) {
    parsed.content = matches[3];
  }

  return parsed;
}
