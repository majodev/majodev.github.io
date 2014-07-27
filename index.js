// node libs
var moment = require("moment");

// metalsmith plugins
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");
var fileMetadata = require('metalsmith-filemetadata');

// custom metalsmith plugins
var deletehiddenfiles = require("./utils/metalsmith-deletehiddenfiles");
var printfilesmeta = require("./utils/metalsmith-printfilesmeta");
var contenthandlebars = require("./utils/metalsmith-contenthandlebars");
var metasetpermalinks = require("./utils/metalsmith-metasetpermalinks");
var metaapplypermalinks = require("./utils/metalsmith-metaapplypermalinks");
var formatdate = require("./utils/metalsmith-formatdate");

// config/build
Metalsmith(__dirname)
  .metadata({
    _dev: true,
    _sitename: "majodev.com",
    _builddate: moment().format("DD MMM YYYY, hh:mm:ss a"),
  })
  .source("./content")
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