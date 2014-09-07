// node generic libs
var argv = require('minimist')(process.argv.slice(2));
var moment = require("moment");

// metalsmith plugins
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");
var ignore = require("metalsmith-ignore");

// custom metalsmith scripts (aka plugins)
var debugsmith = require("./scripts/metalsmith-debugsmith");
var hbs = require("./scripts/metalsmith-hbs");
var permapath = require("./scripts/metalsmith-permapath");
var highlightjs = require("./scripts/metalsmith-highlightjs");
var metaformat = require("./scripts/metalsmith-metaformat");
var tagtree = require("./scripts/metalsmith-tagtree");
var collectiondefaults = require("./scripts/metalsmith-collectiondefaults");
var wordcount = require("./scripts/metalsmith-wordcount");
var filetimestamp = require("./scripts/metalsmith-filetimestamp");
var firstparagraph = require("./scripts/metalsmith-firstparagraph");
var headingsidentifier = require("./scripts/metalsmith-headingsidentifier");
var sitemapper = require("./scripts/metalsmith-sitemapper");

// custom node scripts
var registerHelpers = require("./scripts/registerHelpers");
var registerPartials = require("./scripts/registerPartials");
var injectFiles = require("./scripts/injectFiles");

// registering all Handlebars swag helpers and template partials within all directories
registerHelpers();
registerPartials("templates/base");
registerPartials("templates/blocks");

// check commandline args if development version should be generated!
var dev = argv.productive === true ? false : true;

console.log(argv);

if (dev === false) {
  console.log("-- metalsmith generates productive build...");
} else {
  console.log("-- metalsmith generates development build...");
}

// metalsmith pipeline
Metalsmith(__dirname)
  .metadata({
    _dev: dev,
    _author: "Mario Ranftl",
    _authorTwitter: "majodev",
    _sitename: "ranf.tl",
    _siterepo: "https://github.com/majodev/majodev.github.io/",
    _mail: "mario@ranf.tl",
    _keywords: "Mario Ranftl, majodev, personal website, portfolio",
    _builddate: moment().format("DD MMM YYYY, HH:mm Z"),
    _year: moment().format("YYYY"),
    _inject: injectFiles(dev), // holds all external client libs
    _gitrevision: argv.gitrevision ? argv.gitrevision : "no git revision set"
  })
  .source("./src")
  .destination("./build")
  .use(ignore([
    "**/.DS_Store",
    "**/contact.md"
  ]))
  .use(filetimestamp())
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
    pages: {
      isPage: true,
      sitemap: {
        changefreq: "monthly",
        priority: "1.0"
      }
    },
    notes: {
      isNote: true,
      template: "note.hbs",
      sitemap: {
        changefreq: "daily",
        priority: "0.8"
      },
      setHeadingsIDs: true
    },
    subpages: {
      isSubpage: true,
      sitemap: {
        changefreq: "monthly",
        priority: "0.5"
      }
    }
  }))
  .use(markdown())
  .use(firstparagraph())
  .use(wordcount({
    metaKeyCount: "wordCount",
    metaKeyReadingTime: "readingTime"
  }))
  .use(highlightjs({
    tabReplace: "  "
  }))
  .use(hbs())
  .use(headingsidentifier({
    allow: "setHeadingsIDs"
  }))
  .use(templates({
    engine: "handlebars",
    directory: "templates"
  }))
  .use(permapath({
    mode: "post"
  }))
  .use(sitemapper({
    modifiedProperty: "lastModified",
    absoluteUrl: "http://ranf.tl/"
  }))
// .use(debugsmith({
//   printMetaKeys: true
// }))
.build(function(error) {
  if (error) {
    throw error;
  }
});