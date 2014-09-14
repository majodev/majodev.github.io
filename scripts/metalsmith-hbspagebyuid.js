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
  return function(files, metalsmith, done) {
    setImmediate(done);

    Handlebars.registerHelper('pageByUID', function(hbscontext, hbsoptions) {
      var result;
      
      Object.keys(files).forEach(function(file) {
        if (files[file].uid === hbscontext) {
          result = files[file];
        }
      });

      if (_.isUndefined(result) === true) {
        throw new Error("Cannot find page with uid " + hbsoptions);
      }

      return hbsoptions.fn(result);
    });
  };
}