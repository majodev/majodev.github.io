// converted from https://github.com/segmentio/metalsmith-markdown/blob/master/lib/index.js to parse handlebars files

var basename = require('path').basename;
var dirname = require('path').dirname;
var extname = require('path').extname;
var Handlebars = require("handlebars");
var _ = require("lodash");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to complile handlebars files within src with current meta
 *
 * @return {Function}
 */

function plugin() {

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {

      if (!isHandlebars(file)) {
        return;
      }

      var data = files[file];
      var dir = dirname(file);

      var html = basename(file, extname(file));

      if (!isMarkdown(file)) {
        html += ".html";
      }

      if ('.' != dir) {
        html = dir + '/' + html;
      }

      var template = Handlebars.compile(data.contents.toString());
      var str = template(mergeMeta(metalsmith.data, data, file));
      data.contents = new Buffer(str);

      delete files[file];
      files[html] = data;
    });
  };
}

function mergeMeta(global, local, filename) {
  var merged = {};
  _.each(_.keys(global), (function(key) {
    merged[key] = global[key];
  }));
  _.each(_.keys(local), (function(key) {
    if (_.isUndefined(merged[key]) === false) {
      console.warn("- [hbs] local key " + key + " in file " + filename + " overrides global!");
    }
    merged[key] = local[key];
  }));
  return merged;
}

function isHandlebars(file) {
  return /\.hbs|\.handlebars/.test(extname(file));
}

function isMarkdown(file) {
  return /\.md|\.markdown/.test(file);
}