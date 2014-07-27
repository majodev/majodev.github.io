// metalsmith plugins
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");

// custom metalsmith plugins
var deletehiddenfiles = require("./utils/metalsmith-deletehiddenfiles");
var printfilesmeta = require("./utils/metalsmith-printfilesmeta");
var contenthandlebars = require("./utils/metalsmith-contenthandlebars");
var metasetpermalinks = require("./utils/metalsmith-metasetpermalinks");
var metaapplypermalinks = require("./utils/metalsmith-metaapplypermalinks");

// config/build
Metalsmith(__dirname)
  .metadata({
    _dev: true,
    _sitename: "majodev.com"
  })
  .source("./content")
  .destination("./build")
  .use(deletehiddenfiles())
  .use(metasetpermalinks())
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