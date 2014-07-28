var basename = require('path').basename;
var dirname = require('path').dirname;
var extname = require('path').extname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin set meta property "path" to future real link (without affecting current filename)
 *
 * @return {Function}
 */

function plugin() {

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {

      if (!isPermalinkedExtension(file)) {
        return;
      }

      var postfix = reduceAllExtensions(file);
      var targetname = "";

      // add pre path
      if (dirname(file) !== ".") {
        targetname = dirname(file);
      }

      // add index
      if (postfix !== "index") {
        if(targetname === "") {
          targetname += postfix;
        } else {
          targetname += "/" + postfix;
        }
      }

      // console.log(targetname);

      // set path meta property!
      files[file].path = targetname;
    });
  };
}

function isPermalinkedExtension(file) {
  return /\.hbs|\.md|\.html/.test(extname(file));
}

function reduceAllExtensions(file) {
  var trimmedFilename = basename(file, extname(file));
  if (extname(trimmedFilename) !== "") {
    //console.log(trimmedFilename);
    return reduceAllExtensions(trimmedFilename);
  } else {
    return trimmedFilename;
  }
}