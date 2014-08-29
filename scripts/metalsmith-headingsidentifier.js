var cheerio = require('cheerio');
var extname = require('path').extname;
var _ = require("lodash");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to add an id to all headings on a page
 * ideal for permalink solutions
 * adapted from the wonderful solution from remy sharp
 * (blog post: http://remysharp.com/2014/08/08/automatic-permalinks-for-blog-posts/)
 * (src file: https://github.com/remy/permalink/blob/master/permalink.js) !
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options) {
  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      if (!html(file)) return;

      var idcache = {}; // to handle douple ids
      var data = files[file];
      var $ = cheerio.load(data.contents.toString());

      $("h1,h2,h3,h4,h5,h6").each(function(index, element) {
        if (!element.id) {
          var id = ($(element).text()).replace(/&.*?;/g, '').replace(/\s+/g, '-').replace(/[^\w\-]/g, '').toLowerCase();
          if (idcache[id]) {
            id = id + '-' + index;
          }
          $(element).id = id;
          idcache[id] = 1;
          $(element).prepend('<a class="heading-anchor" href="#' + id + '"><span></span></a>');
        }
      });

      data.contents = $.html();
      files[file] = data; 
    });
  };
}

/**
 * Check if a `file` is html.
 *
 * @param {String} file
 * @return {Boolean}
 */

function html(file) {
  return /\.html?/.test(extname(file));
}