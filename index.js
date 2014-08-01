// node generic libs
var moment = require("moment");

// metalsmith plugins
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");
var fileMetadata = require('metalsmith-filemetadata');
var branch = require('metalsmith-branch');

// custom metalsmith scripts (aka plugins)
var deletehiddenfiles = require("./scripts/metalsmith-deletehiddenfiles");
var debugsmith = require("./scripts/metalsmith-debugsmith");
var hbs = require("./scripts/metalsmith-hbs");
var permapathpre = require("./scripts/metalsmith-permapathpre");
var permapathpost = require("./scripts/metalsmith-permapathpost");
var highlightjs = require("./scripts/metalsmith-highlightjs");
var metaformat = require("./scripts/metalsmith-metaformat");
var permatags = require("./scripts/metalsmith-permatags");

// custom node scripts
var registerPartials = require("./scripts/registerPartials");

// registering all Handlebars partials within directory
registerPartials("templates/partials");

// config/build
Metalsmith(__dirname)
  .metadata({
    _dev: true,
    _sitename: "majodev.com",
    _builddate: moment().format("DD MMM YYYY, hh:mm:ss a")
  })
  .source("./src")
  .destination("./build")
  .use(deletehiddenfiles())
  .use(permapathpre())
  .use(permatags())
  .use(metaformat())
  .use(branch()
    .pattern("!404.*")
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
    })))
  .use(fileMetadata([{
    pattern: "notes/**/*.md",
    metadata: {
      "template": "note.hbs"
    }
  }]))
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
//   printMetaKeys: false
// }))
.build(function(error) {
  if (error) {
    throw error;
  }
});