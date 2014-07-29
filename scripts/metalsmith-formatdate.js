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
      
      if (typeof files[file].date !== "undefined") {
        files[file].formattedDate = moment(files[file].date).format("DD MMM YYYY");
      }

    });
  };
}