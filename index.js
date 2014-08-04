// node generic libs
var moment = require("moment");

// metalsmith plugins
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");

// custom metalsmith scripts (aka plugins)
var deletehiddenfiles = require("./scripts/metalsmith-deletehiddenfiles");
var debugsmith = require("./scripts/metalsmith-debugsmith");
var hbs = require("./scripts/metalsmith-hbs");
var permapath = require("./scripts/metalsmith-permapath");
var highlightjs = require("./scripts/metalsmith-highlightjs");
var metaformat = require("./scripts/metalsmith-metaformat");
var tagtree = require("./scripts/metalsmith-tagtree");
var collectiondefaults = require("./scripts/metalsmith-collectiondefaults");
var wordcount = require("./scripts/metalsmith-wordcount");

// custom node scripts
var registerHelpers = require("./scripts/registerHelpers");
var registerPartials = require("./scripts/registerPartials");
var getVendorFiles = require("./scripts/getVendorFiles");

// registering all Handlebars swag helpers and template partials within all directories
registerHelpers();
registerPartials("templates/base");
registerPartials("templates/blocks");

// config/build
Metalsmith(__dirname)
  .metadata({
    _dev: true,
    _sitename: "majodev.com",
    _builddate: moment().format("DD MMM YYYY, hh:mm:ss a"),
    _vendor: getVendorFiles() // holds all external libs
  })
  .source("./src")
  .destination("./build")
  .use(deletehiddenfiles())
  .use(permapath({
    mode: "pre",
    relative: true,
    custom: [{
      dir: "pages",
      formatWithDateTitle: false
    }, {
      dir: "notes"
    }, {
      dir: "subpages",
      formatWithDateTitle: false
    }]
  }))
  .use(tagtree({
    globalMetaKey: "_tags",
    sortedMetaKey: "_sortedTags",
    fileMetaKey: "tags"
  }))
  .use(metaformat())
  .use(collections({
    pages: {
      pattern: "pages/**/*.*",
      sortBy: "sequence"
    },
    notes: {
      pattern: "notes/**/*.md",
      sortBy: "date",
      reverse: true
    },
    subpages: {
      pattern: "subpages/**/*.*",
      sortBy: "sequence"
    }
  }))
  .use(collectiondefaults({
    notes: {
      template: "note.hbs"
    }
  }))
  .use(hbs())
  .use(markdown())
  .use(wordcount({
    metaKeyCount: "wordCount",
    metaKeyReadingTime: "readingTime"
  }))
  .use(highlightjs({
    tabReplace: "  "
  }))
  .use(templates({
    engine: "handlebars",
    directory: "templates"
  }))
  .use(permapath({
    mode: "post"
  }))
  .use(debugsmith({
    printMetaKeys: false
  }))
  .build(function(error) {
    if (error) {
      throw error;
    }
  });