// converted from https://github.com/segmentio/metalsmith-markdown/blob/master/lib/index.js to parse handlebars files

var basename = require('path').basename;
var dirname = require('path').dirname;
var extname = require('path').extname;
var Handlebars = require("handlebars");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to complile handlebars files within content with current meta
 *
 * @return {Function}
 */

function plugin() {

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      if (!isHandlebars(file)) return;
      var data = files[file];
      var dir = dirname(file);

      var html = basename(file, extname(file));

      if (!isMarkdown(file)) {
        html += ".html";
      }

      if ('.' != dir) html = dir + '/' + html;

      var template = Handlebars.compile(data.contents.toString());
      var str = template(metalsmith.data);
      data.contents = new Buffer(str);

      delete files[file];
      files[html] = data;
    });
  };
}

function isHandlebars(file) {
  return /\.hbs|\.handlebars/.test(extname(file));
}

function isMarkdown(file) {
  return /\.md|\.markdown/.test(file);
}