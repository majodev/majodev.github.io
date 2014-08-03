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

function plugin(options) {

  return function(files, metalsmith, done) {
    setImmediate(done);

    if (_.isUndefined(options) === true || _.isUndefined(options.mode) === true) {
      done(new Error("mode must be supplied! ('pre' to prepare paths in the beginning - 'post' just before the build step to apply them!)"));
    } else {
      if (options.mode === "pre") {
        pre(files);
      } else if (options.mode === "post") {
        post(files);
      } else {
        done(new Error("mode must be either 'pre' or 'post', and nothing else!"));
      }
    }
  };
}

function pre(files) {
  Object.keys(files).forEach(function(file) {

    if (!isPermalinkedExtension(file) || hasRestrictedMeta(files[file])) {
      return;
    }

    var postfix = reduceAllExtensions(file);
    var currentDir = dirname(file);
    var targetname = "";

    // add pre path
    if (dirname(file) !== ".") {
      targetname = currentDir;
    }

    // add index
    if (postfix !== "index") {
      if (targetname === "") {
        targetname += postfix;
      } else {
        targetname += "/" + postfix;
      }
    } else {
      // index file within directory
      // check if there are other files within it and change dir of them accordingly!
      // exclude outer most index file from these operations
      if (currentDir !== ".") {
        Object.keys(files).forEach(function(relatedFile) {
          if (relatedFile !== file && isPermalinkedExtension(relatedFile) === false && relatedFile.indexOf(currentDir) !== -1) {
            // Path of related file must be changed as well!
            files[relatedFile].path = targetname + "/" + basename(relatedFile);
          }
        });
      }
    }

    if (targetname !== "") {
      targetname += "/";
    }

    //console.log(targetname);

    // targetname is in "filename/" format now
    // (with index.html being appended in the post task!)
    files[file].path = targetname;
  });
}

function post(files) {
  Object.keys(files).forEach(function(file) {

    if (_.isUndefined(files[file].path)) {
      return;
    }

    var data = files[file];
    delete files[file];

    if (isPermalinkedExtension(file)) {
      // main permalinked file, index.html must be appended!
      if (data.path === "/") {
        files["index.html"] = data;
      } else {
        files[data.path + "index.html"] = data;
      }
    } else {
      // related file (path already right)
      files[data.path] = data;
    }
  });
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