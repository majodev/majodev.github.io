var _ = require("lodash");

var basename = require('path').basename;
var dirname = require('path').dirname;
var extname = require('path').extname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin apply file meta property "path" (set via permapathpre)
 * to the current file path
 * @return {Function}
 */

function plugin() {

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {

      if (_.isUndefined(files[file].path)) {
        return;
      }

      var data = files[file];
      delete files[file];

      if (data.path === "/") {
        files["index.html"] = data;
      } else {
        files[data.path + "index.html"] = data;
      }

    });
  };
}