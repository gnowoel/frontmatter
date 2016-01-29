var fs = require('fs');
var path = require('path');
var assert = require('chai').assert;
var frontmatter = require('..');

describe('frontmatter', function() {
  it('should parse typical contents', function(done) {
    var filepath = path.join(process.cwd(), 'test/fixture/typical.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      var parsed = frontmatter(content);

      assert.equal(parsed.data.title, 'Welcome');
      assert.equal(parsed.content.trim(), 'Hello!');

      done();
    });
  });

  it('should return null data with empty front matter', function(done) {
    var filepath = path.join(process.cwd(), 'test/fixture/empty.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      var parsed = frontmatter(content);

      assert.equal(parsed.data, null);
      assert.equal(parsed.content.trim(), 'Hello!');

      done();
    });
  });

  it('should throw an error with ill-formatted contents', function(done) {
    var filepath = path.join(process.cwd(), 'test/fixture/error.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      assert.throws(function() {
        frontmatter(content);
      });

      done();
    });
  });

  it('should load even untrusted contents', function(done) {
    var filepath = path.join(process.cwd(), 'test/fixture/untrusted.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      var parsed = frontmatter(content);

      assert.equal(typeof parsed.data.toString, 'function');
      assert.equal(parsed.content.trim(), '');

      done();
    });
  });

  it('should throw an error when loading untrusted contents with safeLoad', function(done) {
    var filepath = path.join(process.cwd(), 'test/fixture/untrusted.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      assert.throws(function() {
        frontmatter(content, { safeLoad: true })
      });

      done();
    });
  });
});
