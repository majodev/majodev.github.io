// node libs
var moment = require("moment");

// metalsmith plugins
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");
var fileMetadata = require('metalsmith-filemetadata');

// custom metalsmith plugins
var deletehiddenfiles = require("./plugins/metalsmith-deletehiddenfiles");
var printfilesmeta = require("./plugins/metalsmith-printfilesmeta");
var contenthandlebars = require("./plugins/metalsmith-contenthandlebars");
var metasetpermalinks = require("./plugins/metalsmith-metasetpermalinks");
var metaapplypermalinks = require("./plugins/metalsmith-metaapplypermalinks");
var formatdate = require("./plugins/metalsmith-formatdate");

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
    directory: "templates",
    partials: {
      pre: "partials/pre",
      post: "partials/post",
      header: "partials/header",
      footer: "partials/footer",
      scripts: "partials/scripts"
    }
  }))
  .use(metaapplypermalinks())
  .use(printfilesmeta())
  .build(function(error) {
    if (error) {
      throw error;
    }
  });