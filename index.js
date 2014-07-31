// node libs
var moment = require("moment");

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