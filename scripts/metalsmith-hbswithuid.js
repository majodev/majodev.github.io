var Handlebars = require("handlebars");
var _ = require("lodash");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to extract an firstparagraph from Markdown files.
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options) {

  var uidCollection = {};

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      if (_.isUndefined(files[file].uid) === false) {
        if (_.isUndefined(uidCollection[files[file].uid]) === true) {
          uidCollection[files[file].uid] = files[file];
        } else {
          throw new Error("Found duplicate uid: " + files[file].uid + " in file " + file);
        }
      }
    });

    // console.log("-- all uids: " + _.keys(uidCollection));

    Handlebars.registerHelper('withuid', function(hbscontext, hbsoptions) {
      var result = uidCollection[hbscontext];

      if (_.isUndefined(result) === true) {
        throw new Error("Cannot find file with uid " + hbscontext);
      }

      return hbsoptions.fn(result);
    });
  };
}