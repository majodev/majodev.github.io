var _ = require("lodash");

var basename = require('path').basename;
var dirname = require('path').dirname;
var extname = require('path').extname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to set and additional file meta property "path"
 * this will provide a future real link (without affecting current filename)
 * @return {Function}
 */

function plugin() {

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {

      if (!isPermalinkedExtension(file) || hasRestrictedMeta(files[file])) {
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
        if (targetname === "") {
          targetname += postfix;
        } else {
          targetname += "/" + postfix;
        }
      }

      if (targetname !== "") {
        targetname += "/";
      }

      // console.log(targetname);

      // set path meta property!
      files[file].path = targetname;
    });
  };
}

function hasRestrictedMeta(fileObject) {
  if (_.isUndefined(fileObject.permalink) === false && fileObject.permalink === false) {
    return true;
  }
  return false;
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