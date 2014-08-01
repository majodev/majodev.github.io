var _ = require("lodash");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to delete hidden osx files from file tree (before build)
 *
 * @return {Function}
 */

function plugin() {
  return function(files, metalsmith, done) {
    setImmediate(done);

    var tags = {};

    Object.keys(files).forEach(function(file) {
      var fileTags = files[file].tags;
      var filePath = files[file].path;
      var fileTitle = files[file].title;

      if (_.isUndefined(fileTags) === true) {
        return;
      }

      for (var i = 0; i < fileTags.length; i++) {
        if (_.isUndefined(tags[fileTags[i]]) === true) {
          tags[fileTags[i]] = [];
        }

        tags[fileTags[i]].push({
          title: fileTitle,
          path: filePath
        });
      }

    });

    // link tags to metalsmith meta...
    metalsmith.data.tags = tags;

  };
}