var _ = require("lodash");
var basename = require('path').basename;

var config = require("../config.json");

module.exports = getVendorFiles;

function getVendorFiles() {

  var vendorFiles = {
    css: [],
    js: [],
    js_head: []
  };

  _.each(config.vendor.css, function (item) {
    vendorFiles.css.push(config.vendor.productive + basename(item));
  });

  _.each(config.vendor.js_head, function (item) {
    vendorFiles.js_head.push(config.vendor.productive + basename(item));
  });

  _.each(config.vendor.js, function (item) {
    vendorFiles.js.push(config.vendor.productive + basename(item));
  });


  return vendorFiles;
}