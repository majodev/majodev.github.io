var basename = require('path').basename;
var dirname = require('path').dirname;
var extname = require('path').extname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin apply meta property "path" to the real link (affects current filename!!!)
 *
 * @return {Function}
 */

function plugin() {

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {

      if (typeof files[file].path === "undefined") {
        return;
      }

      var data = files[file];
      delete files[file];

      if (data.path === "") {
        files[data.path + "index.html"] = data;
      } else {
        files[data.path + "/index.html"] = data;
      }


    });
  };
}