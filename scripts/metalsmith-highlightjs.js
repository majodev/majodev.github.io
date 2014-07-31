var _ = require("lodash");
var hljs = require("highlight.js");
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

    if (_.isUndefined(options) === false && _.isObject(options) === true) {
      hljs.configure(options);
    }

    setImmediate(done);

    Object.keys(files).forEach(function(file) {

      var data = files[file];
      var filename = file;
      var $;

      if (/\.html/.test(extname(file)) === false) {
        return;
      }

      $ = cheerio.load(data.contents.toString());

      $('pre code').each(function(i, block) {
        var code = $(this).text();
        var language = $(this).attr('class');
        var hljsLanguage;
        var hljsObject;
        var postProcessed;

        if (_.isUndefined(language) === false && _.isString(language) === true) {
          // cut "lang-" string from language class...
          language = language.replace("lang-", "");

          hljsLanguage = hljs.getLanguage(language);

          if (_.isUndefined(hljsLanguage) === false) {
            // highlight code with defined language!
            hljsObject = hljs.highlight(language, code);
          } else {
            // fallback highlight by guessing language - provided lang not found
            hljsObject = hljs.highlightAuto(code);
            console.warn("- [hljs] " + file + " block highlight with " + hljsObject.language + " (class lang " + language + " not found!)");
          }

        } else {
          // fallback highlight by guessing
          hljsObject = hljs.highlightAuto(code);
          console.warn("- [hljs] " + file + " block highlight with " + hljsObject.language + " (no class lang provided)");
        }

        postProcessed = hljs.fixMarkup(hljsObject.value);

        $(this).html(postProcessed);

        //
      });


      data.contents = new Buffer($.html());

      delete files[file];
      files[filename] = data;

    });
  };
}