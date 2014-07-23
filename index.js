var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");
var permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .metadata({
    _dev: true,
    _url: "majodev.com"
  })
  .source("./content")
  .destination("./build")
  .use(collections({
    pages: {
      pattern: "*.*",
      sortBy: "sequence"
    },
    notes: {
      pattern: "notes/*.*",
      sortBy: "date",
      reverse: true
    }
  }))
  .use(markdown())
  .use(permalinks())
  .use(templates({
    engine: "handlebars",
    directory: "templates",
    partials: {
      pre: "partials/pre",
      post: "partials/post",
      header: "partials/header",
      footer: "partials/footer"
    }
  }))
  .use(function(files, metalsmith, done) {
    for (var file in files) {
      if(file[0] === "." || file.indexOf("/.") !== -1) { // delete any hidden files (osx)
        delete files[file];
      } else {
        console.log("file: " + file + " - meta keys: " + Object.keys(files[file]));
      }
    }
    done();
  })
  .build(function(error) {
    if (error) {
      throw error;
    }
  });