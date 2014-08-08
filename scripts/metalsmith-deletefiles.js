/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to remove unwanted files from metalsmith build tree
 *
 * @return {Function}
 */

function plugin() {
  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      if (file[0] === "." || file.indexOf("/.") !== -1) { // delete any hidden files (osx)
        delete files[file];
      }
      if (file.indexOf("/less") !== -1) {
        delete files[file];
      }
    });
  };
}