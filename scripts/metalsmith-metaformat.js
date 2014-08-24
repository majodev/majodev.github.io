var _ = require("lodash");
var moment = require("moment");
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin formats date meta and set extra meta flag
 *
 * @return {Function}
 */

function plugin() {

  return function(files, metalsmith, done) {
    setImmediate(done);

    Object.keys(files).forEach(function(file) {
      
      if (_.isUndefined(files[file].date) === false) {
        files[file].formattedDate = moment(files[file].date).format("DD MMM YYYY");
      }

      if (_.isUndefined(files[file].lastModified) === false) {
        files[file].formattedLastModified = moment(files[file].lastModified).format("DD MMM YYYY, HH:mm Z");
        files[file].lastModifiedMeta = moment(files[file].lastModified).format("YYYY-MM-DD@HH:mm:ss Z");
      }

    });
  };
}