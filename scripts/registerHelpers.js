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

  Swag.addHelper("encodeuri", function(str) {
    return encodeURIComponent(str);
  }, "string");

  Swag.addHelper("dateFormatShort", function(date) {
    return moment(date).format("DD MMM YYYY");
  }, "date");

  Swag.addHelper("dateFormatLong", function(date) {
    return moment(date).format("DD MMM YYYY, HH:mm Z");
  }, "date");

  Swag.addHelper("dateFormatMeta", function(date) {
    return moment(date).format("YYYY-MM-DD@HH:mm:ss Z");
  }, "date");

  Swag.addHelper("dateFormatISO", function(date) {
    return moment(date).toISOString();
  }, "date");

  Swag.addHelper("dateFormatYear", function(date) {
    return moment(date).format("YYYY");
  }, "date");

  Swag.addHelper("each_upto", function(ary, max, options) {
    if (!ary || ary.length === 0)
      return options.inverse(this);

    var result = [];
    for (var i = 0; i < max && i < ary.length; ++i)
      result.push(options.fn(ary[i]));
    return result.join('');
  }, "array");

  Swag.addHelper('json', function(obj) {
    return JSON.stringify(obj);
  }, "object");

  Swag.addHelper('if_even', function(conditional, options) {
    if ((conditional % 2) === 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  // via http://jaketrent.com/post/every-nth-item-in-handlebars-loop/
  // Swag.addHelper('everyNth', function(context, every, options) {
  //   var fn = options.fn,
  //     inverse = options.inverse;
  //   var ret = "";
  //   if (context && context.length > 0) {
  //     for (var i = 0, j = context.length; i < j; i++) {
  //       var modZero = i % every === 0;
  //       ret = ret + fn(_.extend({}, context[i], {
  //         isModZero: modZero,
  //         isModZeroNotFirst: modZero && i > 0,
  //         isLast: i === context.length - 1
  //       }));
  //     }
  //   } else {
  //     ret = inverse(this);
  //   }
  //   return ret;
  // });

  // register Swag Handlebars helpers
  Swag.registerHelpers(Handlebars);
}