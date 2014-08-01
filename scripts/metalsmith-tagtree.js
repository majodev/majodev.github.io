var _ = require("lodash");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin build a global tag tree in _tags (or other)
 *
 * @return {Function}
 */

function plugin(options) {
  return function(files, metalsmith, done) {
    setImmediate(done);

    var globalMetaKey = "_tags";
    var fileMetaKey = "tags";
    var _tags = {};

    if (_.isUndefined(options) === false) {
      if (_.isUndefined(options.globalMetaKey) === false) {
        globalMetaKey = options.globalMetaKey;
      }
      if (_.isUndefined(options.fileMetaKey) === false) {
        fileMetaKey = options.fileMetaKey;
      }
    }

    Object.keys(files).forEach(function(file) {
      var fileTags = files[file][fileMetaKey];

      if (_.isUndefined(fileTags) === true) {
        return;
      }

      for (var i = 0; i < fileTags.length; i++) {
        if (_.isUndefined(_tags[fileTags[i]]) === true) {
          _tags[fileTags[i]] = [];
        }

        _tags[fileTags[i]].push(files[file]);
      }

    });

    // link tags to metalsmith meta...
    metalsmith.data[globalMetaKey] = _tags;

  };
}