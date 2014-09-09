var _ = require("lodash");
var basename = require('path').basename;
var dirname = require('path').dirname;
var extname = require('path').extname;
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to output current filetree (+ meta keys)
 *
 * @return {Function}
 */

function plugin(options) {
  return function(files, metalsmith, done) {
    setImmediate(done);
    if (_.isUndefined(options.include) === true || options.include === false) {
      Object.keys(files).forEach(function(file) {
        if (isHtml(file) || isHandlebars(file) || isMarkdown(file)) {
          if (_.isUndefined(files[file].published) === true || files[file].published === false) {
            console.log("-- excluding draft: " + file);
            

            if (reduceAllExtensions(file) === "index") {
              Object.keys(files).forEach(function(relatedFile) {
                if (relatedFile !== file && relatedFile.indexOf(dirname(file)) !== -1) {
                  console.log("-- -- excluding related file: " + relatedFile);
                  delete files[relatedFile];
                }
              });
            }

            delete files[file];

          }
        }
      });
    }
  };
}

function isHtml(file) {
  return /\.html?/.test(extname(file));
}

function isHandlebars(file) {
  return /\.hbs|\.handlebars/.test(extname(file));
}

function isMarkdown(file) {
  return /\.md|\.markdown/.test(file);
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