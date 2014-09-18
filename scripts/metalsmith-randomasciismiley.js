var _ = require("lodash");
var coolAsciiFaces = require("cool-ascii-faces");
var extname = require('path').extname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin formats date meta and set extra meta flag
 *
 * @return {Function}
 */

function plugin(options) {

  var metaKey = "asciismiley";

  if(_.isUndefined(options) === false && _.isUndefined(options.metaKey) === false) {
    metaKey = options.metaKey;
  }

  return function(files, metalsmith, done) {
    setImmediate(done);

    Object.keys(files).forEach(function(file) {
      if (isRelevant(file) === false) {
        return;
      }
      files[file][metaKey] = coolAsciiFaces();

    });
  };
}

function isRelevant(file) {
  return /\.html|\.hbs|\.md/.test(extname(file));
}