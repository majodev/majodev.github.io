var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");
var permalinks = require('metalsmith-permalinks');

var deletehiddenfiles = require("./utils/metalsmith-deletehiddenfiles");
var printfilesmeta = require("./utils/metalsmith-printfilesmeta");

Metalsmith(__dirname)
  .metadata({
    _dev: true,
    _sitename: "majodev.com"
  })
  .source("./content")
  .destination("./build")
  .use(deletehiddenfiles())
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
  .use(markdown())
  .use(permalinks({
    relative: false
  }))
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
  .use(printfilesmeta())
  .build(function(error) {
    if (error) {
      throw error;
    }
  });