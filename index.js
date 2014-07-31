// node libs
var moment = require("moment");
var hljs = require("highlight.js");
var cheerio = require("cheerio");
var extname = require('path').extname;
var _ = require("lodash");

// metalsmith plugins
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");
var fileMetadata = require('metalsmith-filemetadata');

// custom metalsmith scripts (aka plugins)
var deletehiddenfiles = require("./scripts/metalsmith-deletehiddenfiles");
var printfilesmeta = require("./scripts/metalsmith-printfilesmeta");
var contenthandlebars = require("./scripts/metalsmith-contenthandlebars");
var metasetpermalinks = require("./scripts/metalsmith-metasetpermalinks");
var metaapplypermalinks = require("./scripts/metalsmith-metaapplypermalinks");
var formatdate = require("./scripts/metalsmith-formatdate");

// custom node scripts
var registerPartials = require("./scripts/registerPartials");

// register all Handlebars partials within directory
registerPartials("templates/partials");

// config/build
Metalsmith(__dirname)
  .metadata({
    _dev: true,
    _sitename: "majodev.com",
    _builddate: moment().format("DD MMM YYYY, hh:mm:ss a"),
  })
  .source("./src")
  .destination("./build")
  .use(deletehiddenfiles())
  .use(metasetpermalinks())
  .use(formatdate())
  .use(collections({
    pages: {
      pattern: "*.*",
      sortBy: "sequence"
    },
    notes: {
      pattern: "notes/**/*.md",
      sortBy: "date",
      reverse: true
    }
  }))
  .use(fileMetadata([{
    pattern: "notes/**/*.md",
    metadata: {
      "template": "note.hbs"
    }
  }]))
  .use(contenthandlebars())
  .use(markdown())
  .use(function(files, metalsmith, done) {
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
          }

        } else {
          // fallback highlight by guessing
          hljsObject = hljs.highlightAuto(code);
        }

        $(this).html(hljsObject.value);

        console.log("- [hljs] " + file + " block highlight with " + hljsObject.language + " (class lang was: " + language + ")");
      });


      data.contents = new Buffer($.html());

      delete files[file];
      files[filename] = data;

    });
  })
  .use(templates({
    engine: "handlebars",
    directory: "templates"
  }))
  .use(metaapplypermalinks())
  .use(printfilesmeta({
    printMetaKeys: false
  }))
  .build(function(error) {
    if (error) {
      throw error;
    }
  });