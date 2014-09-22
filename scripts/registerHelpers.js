var Handlebars = require("handlebars");
var Swag = require("swag");
var _ = require("lodash");

module.exports = registerHelpers;

function registerHelpers() {
  Swag.addHelper('withSortReverse', function(array, field, options) {
    var item, result, _i, _len;
    result = '';
    if (_.isUndefined(field)) {
      options = field;
      array = array.sort().reverse();
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        item = array[_i];
        result += options.fn(item);
      }
    } else {
      array = array.sort(function(a, b) {
        return a[field] < b[field];
      });
      for (item in array) {
        result += options.fn(array[item]);
      }
    }
    return result;
  }, 'array');

  Swag.addHelper("encodeuri", function (str) {
    return encodeURIComponent(str);  
  }, "string");

  // register Swag Handlebars helpers
  Swag.registerHelpers(Handlebars);
}