// adapted from https://github.com/segmentio/metalsmith-markdown/blob/master/lib/index.js to parse handlebars files
// possible solution to https://github.com/segmentio/metalsmith/issues/75

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

      var newFileName = reduceAllExtensions(file);

      if (isMarkdown(file)) {
        newFileName += ".md";
      } else {
        newFileName += ".html"; // assumes .html is the default output format!
      }

      if (dir !== '.') {
        newFileName = dir + '/' + newFileName;
      }

      var template = Handlebars.compile(data.contents.toString());
      var str = template(mergeMeta(metalsmith.data, data, file));
      data.contents = new Buffer(str);

      delete files[file];
      files[newFileName] = data;
      // console.log(newFileName);
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
  return /\.hbs|\.handlebars/.test(file);
}

function isMarkdown(file) {
  return /\.md|\.markdown/.test(file);
}

function reduceAllExtensions(file) {
  var trimmedFilename = basename(file, extname(file));
  if (extname(trimmedFilename) !== "") {
    //console.log(trimmedFilename);
    return reduceAllExtensions(trimmedFilename);
  } else {
    return trimmedFilename;
  }
}