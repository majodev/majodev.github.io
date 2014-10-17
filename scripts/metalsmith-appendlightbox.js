var _ = require("lodash");
var cheerio = require("cheerio");
var extname = require('path').extname;
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to output current filetree (+ meta keys)
 *
 * @return {Function}
 */

function plugin(options) {
  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      var data = files[file];
      var filename = file;
      var $;

      if (isHtml(file) === false) {
        return;
      }

      if (files[file].lightbox) {
        $ = cheerio.load(data.contents.toString());

        $('img').each(function(i, block) {
          var $img = $(this);
          var src = $img.attr("src");
          var alt = $img.attr("alt");
          var plain = '<img src="' + src + '" alt="' + alt + '">';

          var replaceString = "";

          // console.log(plain);

          replaceString = '<a class="lightboximgwrap" href="' + src + '">' + plain + '</a>';

          // console.log(replaceString);

          $(this).replaceWith(replaceString);

        });

        files[file].contents = $.html();
      }

    });
  };
}

function isHtml(file) {
  return /\.html?/.test(extname(file));
}