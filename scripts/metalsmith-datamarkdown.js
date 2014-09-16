var marked = require("marked");
var cheerio = require('cheerio');
var extname = require('path').extname;
var he = require("he");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to use marked for normal html or md files
 * parses all blocks that have the attribute data-markdown set
 *
 * Idea originally by Paul Irish, see https://gist.github.com/paulirish/1343518
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options) {
  marked.setOptions(options);

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      if (!isHtml(file)) return;
      var data = files[file];
      var foundMatches = false;

      var $ = cheerio.load(data.contents.toString());

      $("[data-markdown]").each(function(index) {
        var markedText = marked(he.decode($(this).html()));
        //console.log(markedText);
        $(this).html(markedText);
        foundMatches = true;
      });

      if (foundMatches) {
        files[file].contents = $.html();
      }

    });
  };
}

/**
 * Check if a `file` is html.
 *
 * @param {String} file
 * @return {Boolean}
 */

function isHtml(file) {
  return /\.html?/.test(extname(file));
}