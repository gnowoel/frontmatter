var yaml = require('js-yaml');

module.exports = function(string) {
  var data, content;

  var pattern = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/;
  var matches = string.match(pattern);

  if (matches[2]) {
    var match = matches[2];

    try {
      data = yaml.load(match);
    } catch(err) {
      throw err;
    }

    content = matches[3];
  }

  if (!data) return;

  return { data: data, content: content };
}
