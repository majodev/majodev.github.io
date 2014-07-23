var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");

Metalsmith(__dirname)
  .source("./content")
  .destination("./build")
  .metadata({
    _dev: true,
    _url: "majodev.com"
  })
  .use(markdown())
  .use(collections({
    notes: {
      pattern: "notes/*.md",
      sortBy: "date",
      reverse: true
    }
  }))
  .use(templates({
    engine: "handlebars",
    directory: "templates",
    partials: {
      header: "partials/header",
      footer: "partials/footer"
    }
  }))
  .build(function(error) {
    if (error) {
      throw error;
    }
  });