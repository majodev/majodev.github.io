// node generic libs
var moment = require("moment");

// metalsmith plugins
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");
var branch = require('metalsmith-branch');

// custom metalsmith scripts (aka plugins)
var deletehiddenfiles = require("./scripts/metalsmith-deletehiddenfiles");
var debugsmith = require("./scripts/metalsmith-debugsmith");
var hbs = require("./scripts/metalsmith-hbs");
var permapathpre = require("./scripts/metalsmith-permapathpre");
var permapathpost = require("./scripts/metalsmith-permapathpost");
var highlightjs = require("./scripts/metalsmith-highlightjs");
var metaformat = require("./scripts/metalsmith-metaformat");
var tagtree = require("./scripts/metalsmith-tagtree");
var collectiondefaults = require("./scripts/metalsmith-collectiondefaults");

// custom node scripts
var registerPartials = require("./scripts/registerPartials");
var getVendorFiles = require("./scripts/getVendorFiles");

// registering all Handlebars partials within all directories
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
  .use(permapathpre())
  .use(tagtree({
    globalMetaKey: "_tags",
    fileMetaKey: "tags"
  }))
  .use(metaformat())
  .use(branch()
    .pattern("!+(404|tags|legal).*") // exclude minor pages from collections
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
    .use(collectiondefaults({
      notes: {
        template: "note.hbs"
      }
    })))
  .use(hbs())
  .use(markdown())
  .use(highlightjs({
    tabReplace: '  '
  }))
  .use(templates({
    engine: "handlebars",
    directory: "templates"
  }))
  .use(permapathpost())
  // .use(debugsmith({
  //   printMetaKeys: true
  // }))
  .build(function(error) {
    if (error) {
      throw error;
    }
  });