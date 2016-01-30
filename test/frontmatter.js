var fs = require('fs');
var path = require('path');
var assert = require('chai').assert;
var frontmatter = require('..');

describe('frontmatter', function() {
  it('should parse typical contents', function(done) {
    var filepath = path.join(process.cwd(), 'test/sample/typical.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      var parsed = frontmatter(content);

      assert.equal(parsed.data.layout, 'default');
      assert.equal(parsed.data.title, 'Welcome');
      assert.equal(parsed.data.date, '2016-01-30 12:30:06 +0800');
      assert.equal(parsed.content, '\nHello!\n');

      done();
    });
  });

  it('should return empty data with empty front matter', function(done) {
    var filepath = path.join(process.cwd(), 'test/sample/empty.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      var parsed = frontmatter(content);

      assert.equal(Object.keys(parsed.data), 0);
      assert.equal(parsed.content, '\nHello!\n');

      done();
    });
  });

  it('should return null data if front matter undefined', function(done) {
    var filepath = path.join(process.cwd(), 'test/sample/null.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      var parsed = frontmatter(content);

      assert.equal(parsed.data, null);
      assert.equal(parsed.content, 'Hello!\n');

      done();
    });
  });

  it('should throw an error with ill-formatted contents', function(done) {
    var filepath = path.join(process.cwd(), 'test/sample/error.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      assert.throws(function() {
        frontmatter(content);
      });

      done();
    });
  });

  it('should load even untrusted contents', function(done) {
    var filepath = path.join(process.cwd(), 'test/sample/untrusted.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      var parsed = frontmatter(content);

      assert.equal(typeof parsed.data.toString, 'function');
      assert.equal(parsed.content, '');

      done();
    });
  });

  it('should throw an error when loading untrusted contents with safeLoad', function(done) {
    var filepath = path.join(process.cwd(), 'test/sample/untrusted.md');

    fs.readFile(filepath, 'utf8', function(err, content) {
      if (err) throw err;

      assert.throws(function() {
        frontmatter(content, { safeLoad: true })
      });

      done();
    });
  });
});
