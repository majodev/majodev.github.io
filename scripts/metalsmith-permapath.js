var _ = require("lodash");
var moment = require("moment");
var getSlug = require("speakingurl");

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
        pre(files, options, done);
      } else if (options.mode === "post") {
        post(files);
      } else {
        done(new Error("mode must be either 'pre' or 'post', and nothing else!"));
      }
    }
  };
}

function pre(files, options, done) {

  var relative = options.relative || false;
  var customs = setCustomDefaults(options, done);

  Object.keys(files).forEach(function(file) {

    var targetname;
    var postfix;
    var custom;

    if (!isPermalinkedExtension(file) || hasRestrictedMeta(files[file])) {
      return;
    }

    //console.log(dirname(file));

    postfix = reduceAllExtensions(file).toLowerCase();
    custom = getCustomObject(file, customs);

    //console.log(custom.formatWithDateTitle);

    // file to foldername, or with date?
    if (custom === false || custom.formatWithDateTitle === false) {
      targetname = fileToFolderName(file, postfix, custom);
    } else {
      targetname = fileToPattern(file, custom, files[file], postfix);
    }

    // path meta key of file ready at this point!
    // console.log(targetname);

    // check relative files within dir
    // check if there are other files within it and change dir of them accordingly!
    // exclude outer most index file from these operation!
    if (relative === true && postfix === "index" && dirname(file) !== ".") {
      Object.keys(files).forEach(function(relatedFile) {
        if (relatedFile !== file && isPermalinkedExtension(relatedFile) === false && relatedFile.indexOf(dirname(file)) !== -1) {
          // Path of related file must be changed as well!
          files[relatedFile].path = targetname + basename(relatedFile);
          // console.log(files[relatedFile].path);
        }
      });
    }

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

function fileToPattern(file, custom, data) {
  var returnString = "";

  if (custom.excludeDir === false) {
    returnString += custom.dir + "/";
  }

  returnString += moment(data.date).format(custom.dateFormat) + "/";

  if (custom.slugify === true) {
    returnString += getSlug(data.title) + "/";
  } else {
    returnString += data.title + "/";
  }

  return sanitize(returnString);
}

function fileToFolderName(file, postfix, custom) {
  var targetname = "";
  var directory = dirname(file);

  // console.log(file + " -- " + postfix);

  // add pre path
  if (directory !== ".") {
    if (custom !== false && custom.excludeDir === true) {
      targetname = directory.split(custom.dir)[1];

      if(targetname[0] === "/") {
        // remove beginning slash
        targetname = targetname.substring(1);
      }
      
    } else {
      targetname = directory;
    }
  }

  


  // filename to foldername if not index!
  if (postfix !== "index") {
    if (targetname === "") {
      targetname += postfix;
    } else {
      targetname += "/" + postfix;
    }
  }

  // append ending slash, except root index file
  if (targetname !== "") {
    targetname += "/";
  }

  return sanitize(targetname);
}

function getCustomObject(file, customs) {

  var matched = _.find(customs, function(customItem) {
    return (dirname(file).indexOf(customItem.dir) !== -1);
  });

  if (_.isUndefined(matched)) {
    return false;
  }

  // console.log(matched);
  return matched;
}

function hasRestrictedMeta(fileObject) {
  if (_.isUndefined(fileObject.skipPermalink) === false && fileObject.skipPermalink === true) {
    return true;
  }
  return false;
}

function isPermalinkedExtension(file) {
  return /\.hbs|\.md|\.html/.test(extname(file));
}

function sanitize(url) {
  return url.replace(/\s+/g, '-').toLowerCase();
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

function setCustomDefaults(options, done) {

  var customs = [];
  var defaultCustom = {
    formatWithDateTitle: true,
    dateFormat: "YYYY/MM/DD",
    excludeDir: true,
    slugify: true
  };

  if (_.isUndefined(options.custom)) {
    return customs;
  }

  _.each(options.custom, function(customObj) {

    if (_.isUndefined(customObj.dir)) {
      done(new Error("options.custom object, key 'dir' must be set!"));
    }

    customObj.dateFormat = _.isUndefined(customObj.dateFormat) ? defaultCustom.dateFormat : customObj.dateFormat;
    customObj.excludeDir = _.isUndefined(customObj.excludeDir) ? defaultCustom.excludeDir : customObj.excludeDir;
    customObj.slugify = _.isUndefined(customObj.slugify) ? defaultCustom.slugify : customObj.slugify;
    customObj.formatWithDateTitle = _.isUndefined(customObj.formatWithDateTitle) ? defaultCustom.formatWithDateTitle : customObj.formatWithDateTitle;
    customs.push(customObj);
  });

  return customs;
}