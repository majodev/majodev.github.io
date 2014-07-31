var _ = require("lodash");
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to output current filetree (+ meta keys)
 *
 * @return {Function}
 */

function plugin(options) {
  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      if (_.isUndefined(options) === false && _.isUndefined(options.printMetaKeys) === false && options.printMetaKeys === true) {
        console.log("- [meta] " + file + " (" + Object.keys(files[file]) + ")");
      } else {
        console.log("- [meta] " + file);
      }
    });
  };
}