// modified from https://github.com/segmentio/metalsmith-excerpts/blob/master/lib/index.js
var extname = require('path').extname;
var cheerio = require('cheerio');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to extract an firstparagraph from Markdown files.
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options){
  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      if (!html(file)) return;
      var data = files[file];

      var $ = cheerio.load(data.contents.toString());

      // remove all links
      $("a").each(function (index) {
        $(("a")[index]).replaceWith($($("a")[index]).text());
      });

      // get first paragraph
      var p = $('p').first();

      // trim and save
      data.firstparagraph = $.html(p).trim();
      files[file] = data; // original creator eventually forgot to save it...

    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function html(file){
  return /\.html?/.test(extname(file));
}