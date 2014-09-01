var _ = require("lodash");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to set default metadata to files with preset collection meta
 *
 * @return {Function}
 */

function plugin(options) {
  return function(files, metalsmith, done) {
    setImmediate(done);

    var defCol = options;

    if (_.isObject(defCol)) {
      Object.keys(files).forEach(function(file) {
        var collection = files[file].collection;
        var data = files[file];

        if (_.isUndefined(collection)) {
          return;
        } else {
          _.each(_.keys(defCol), function(defColKey) {
            //if (defColKey === collection) { // metalsmith-collections update 0.6.1, is now array!
            if (_.contains(collection, defColKey) === true) {
              // collection default matches file collection
              _.each(_.keys(defCol[defColKey]), function(defColItem) {
                //console.log(defColItem + ":" + defCol[defColKey][defColItem]);
                
                // warn about overwrites...
                if (_.isUndefined(data[defColItem]) === false) {
                  console.warn("- [collectiondefaults] " + file + " metadata '" + defColItem + "' overwritten to '" + defCol[defColKey][defColItem] + "' (was '" + data[defColItem] + "')");
                }

                // default values needs to be applied...
                data[defColItem] = defCol[defColKey][defColItem];

              });
            }
          });
          // console.log(collection);
        }
      });
    }
  };
}