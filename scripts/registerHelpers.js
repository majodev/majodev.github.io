var Handlebars = require("handlebars");
var Swag = require("swag");
var _ = require("lodash");
var moment = require("moment");

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

  Swag.addHelper("dateFormatShort", function (date) {
    return moment(date).format("DD MMM YYYY");
  }, "date");

  Swag.addHelper("dateFormatLong", function (date) {
    return moment(date).format("DD MMM YYYY, HH:mm Z");
  }, "date");

  Swag.addHelper("dateFormatMeta", function (date) {
    return moment(date).format("YYYY-MM-DD@HH:mm:ss Z");
  }, "date");

  Swag.addHelper("dateFormatISO", function (date) {
    return moment(date).toISOString();
  }, "date");

  Swag.addHelper("dateFormatYear", function (date) {
    return moment(date).format("YYYY");
  }, "date");

  Swag.addHelper("each_upto", function(ary, max, options) {
    if(!ary || ary.length === 0)
        return options.inverse(this);
 
    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
  }, "array");

  Swag.addHelper('json', function(obj) {
    return JSON.stringify(obj);
  }, "object");

  // register Swag Handlebars helpers
  Swag.registerHelpers(Handlebars);
}