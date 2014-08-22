var _ = require("lodash");
var basename = require('path').basename;

var config = require("../config.json");

module.exports = injectFiles;

function injectFiles(isDev) {

  var injectFiles = {
    css: [],
    js: [],
    js_head: []
  };

  if (isDev === true) {
    
    _.each(config.inject.css, function(item) {
      injectFiles.css.push(config.inject.metalsmithBaseDir.css + basename(item));
    });

    injectFiles.css.push(config.inject.metalsmithBaseDir.css + basename(config.inject.less.dest)); // add less file on top of it!

    _.each(config.inject.js_head, function(item) {
      injectFiles.js_head.push(config.inject.metalsmithBaseDir.js + basename(item));
    });

    _.each(config.inject.js, function(item) {
      injectFiles.js.push(config.inject.metalsmithBaseDir.js + basename(item));
    });

  } else {

    injectFiles.css.push(config.inject.metalsmithBaseDir.css + config.inject.productive.css);
    injectFiles.js_head.push(config.inject.metalsmithBaseDir.js + config.inject.productive.js_head);
    injectFiles.js.push(config.inject.metalsmithBaseDir.js + config.inject.productive.js);

  }



  return injectFiles;
}