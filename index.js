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
var includedrafts = require("./scripts/metalsmith-includedrafts");
var datamarkdown = require("./scripts/metalsmith-datamarkdown");
var hbswithuid = require("./scripts/metalsmith-hbswithuid");
var randomasciismiley = require("./scripts/metalsmith-randomasciismiley");

// custom node scripts
var registerHelpers = require("./scripts/registerHelpers");
var registerPartials = require("./scripts/registerPartials");
var injectFiles = require("./scripts/injectFiles");
var stringToHexa = require("./scripts/stringToHexa");

// registering all Handlebars swag helpers and template partials within all directories
registerHelpers();
registerPartials("templates/base");
registerPartials("templates/blocks");

// check commandline args if development version should be generated!
var dev = argv.productive === true ? false : true;

if (dev === false) {
  console.log("-- metalsmith generates productive build...");
} else {
  console.log("-- metalsmith generates development build...");
}

var absoluteUrl = "http://ranf.tl/";
var currentDate = new Date();

// metalsmith pipeline
Metalsmith(__dirname)
  .metadata({
    _dev: dev,
    _author: "Mario Ranftl",
    _authorTwitter: "majodev",
    _sitename: "ranf.tl",
    _siterepo: "https://github.com/majodev/majodev.github.io/",
    _mailEncrypted: stringToHexa("mario@ranf.tl"),
    _keywords: "Mario Ranftl, majodev, personal website, portfolio",
    _builddate: moment(currentDate).format("DD MMM YYYY, HH:mm Z"),
    _builddateISO: moment(currentDate).toISOString(),
    _year: moment(currentDate).format("YYYY"),
    _inject: injectFiles(dev), // holds all external client libs
    _gitrevision: argv.gitrevision ? argv.gitrevision.toString() : "no git revision set",
    _absoluteUrl: absoluteUrl
  })
  .source("./src")
  .destination("./build")
  .use(ignore([
    "**/.DS_Store"
  ]))
  .use(includedrafts({
    include: dev
  }))
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
  .use(randomasciismiley())
  .use(collections({
    pages: {
      pattern: "pages/**/*.+(md|hbs|html)",
      sortBy: "sequence"
    },
    notes: {
      pattern: "notes/**/*.+(md|hbs|html)",
      sortBy: "date",
      reverse: true
    },
    subpages: {
      pattern: "subpages/**/*.+(md|hbs|html)",
      sortBy: "sequence"
    }
  }))
  .use(collectiondefaults({
    pages: {
      isPage: true,
      sitemap: {
        changefreq: "monthly",
        priority: "1.0"
      },
      disqus: {
        enabled: false
      }
    },
    notes: {
      isNote: true,
      template: "note.hbs",
      sitemap: {
        changefreq: "daily",
        priority: "0.8"
      },
      setHeadingsIDs: true,
      disqus: {
        enabled: true
      }
    },
    subpages: {
      isSubpage: true,
      sitemap: {
        changefreq: "monthly",
        priority: "0.5"
      },
      disqus: {
        enabled: false
      }
    }
  }))
  .use(markdown({
    gfm: true,
    breaks: true,
    tables: true,
    smartLists: true,
    smartypants: true
  }))
  .use(firstparagraph())
  .use(wordcount({
    metaKeyCount: "wordCount",
    metaKeyReadingTime: "readingTime"
  }))
  .use(highlightjs({
    tabReplace: "  "
  }))
  .use(hbswithuid())
  .use(hbs())
  .use(headingsidentifier({
    allow: "setHeadingsIDs"
  }))
  .use(datamarkdown({
    gfm: true,
    breaks: true,
    tables: true,
    smartLists: true,
    smartypants: true
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
    absoluteUrl: absoluteUrl
  }))
// .use(debugsmith({
//   printMetaKeys: true
// }))
.build(function(error) {
  if (error) {
    throw error;
  }
});