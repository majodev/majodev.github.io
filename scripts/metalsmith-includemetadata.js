var _ = require("lodash");
var dirname = require('path').dirname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to add JSON data directly into one files metadata
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options) {

  var keyToUseForPlugin = "includeMetadata";
  var deleteFileAfterInclude = false;

  if (_.isUndefined(options) === false && _.isUndefined(options.metaKey) === false) {
    keyToUseForPlugin = options.metaKey;
  }

  if (_.isUndefined(options) === false && _.isUndefined(options.deleteFileAfterInclude) === false) {
    deleteFileAfterInclude = options.deleteFileAfterInclude;
  }

  var jsonFilesParsed = [];

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      var jsonfiles = files[file].includeMetadata;
      if (_.isUndefined(jsonfiles) === false) {
        _.each(jsonfiles, function(jsonfile) {
          var dataKeyName = dirname(file) + "/" + jsonfile;
          var jsonData = JSON.parse(files[dataKeyName].contents);
          jsonFilesParsed.push(dataKeyName);

          _.each(_.keys(jsonData), function(key) {

            if (_.isUndefined(files[file][key]) === true) {
              files[file][key] = jsonData[key];
            } else {
              console.error("Encountered duplicate Key while merging: " + key + ": " + files[file][key]);
            }

          });

        });
      }
    });

    if (deleteFileAfterInclude) {
      _.each(jsonFilesParsed, function(filename) {
        delete files[filename];
      });
    }

  };
}