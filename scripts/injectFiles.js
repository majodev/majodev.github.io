var _ = require("lodash");
var basename = require('path').basename;

var config = require("../config.json");

module.exports = injectFiles;

function injectFiles() {

  var injectFiles = {
    css: [],
    js: [],
    js_head: []
  };

  _.each(config.inject.css, function (item) {
    injectFiles.css.push(config.inject.metalsmithBaseDir.css + basename(item));
  });

  _.each(config.inject.js_head, function (item) {
    injectFiles.js_head.push(config.inject.metalsmithBaseDir.js + basename(item));
  });

  _.each(config.inject.js, function (item) {
    injectFiles.js.push(config.inject.metalsmithBaseDir.js + basename(item));
  });


  return injectFiles;
}