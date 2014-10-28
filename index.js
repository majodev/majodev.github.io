// node generic libs
var argv = require('minimist')(process.argv.slice(2));

// metalsmith plugins
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var collections = require("metalsmith-collections");
var ignore = require("metalsmith-ignore");
var wordcount = require("metalsmith-word-count"); // extracted & published to npm
var headingsidentifier = require("metalsmith-headings-identifier"); // extracted & published to npm
var datamarkdown = require("metalsmith-data-markdown"); // extracted & published to npm

// custom metalsmith scripts (aka plugins)
var debugsmith = require("./scripts/metalsmith-debugsmith");
var hbs = require("./scripts/metalsmith-hbs");
var permapath = require("./scripts/metalsmith-permapath");
var highlightjs = require("./scripts/metalsmith-highlightjs");
var tagtree = require("./scripts/metalsmith-tagtree");
var collectiondefaults = require("./scripts/metalsmith-collectiondefaults");
var filetimestamp = require("./scripts/metalsmith-filetimestamp");
var firstparagraph = require("./scripts/metalsmith-firstparagraph");
var sitemapper = require("./scripts/metalsmith-sitemapper");
var includedrafts = require("./scripts/metalsmith-includedrafts");
var hbswithuid = require("./scripts/metalsmith-hbswithuid");
var randomasciismiley = require("./scripts/metalsmith-randomasciismiley");
var appendlightbox = require("./scripts/metalsmith-appendlightbox");
var includemetadata = require("./scripts/metalsmith-includemetadata");

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

// metalsmith pipeline
Metalsmith(__dirname)
  .metadata({
    _dev: dev,
    _author: "Mario Ranftl",
    _authorTwitter: "majodev",
    _sitename: "ranf.tl",
    _siterepo: "https://github.com/majodev/majodev.github.io/",
    _mailEncrypted: stringToHexa("mario@ranf.tl"),
    _description: "I'm Mario Ranftl (majodev), an information manager from Austria. This site is an experiment to write (and ramble on) about my professional life.",
    _keywords: "mario ranftl, ranf.tl, majodev, ranftl, mario, professional, " + 
      "austria, fehring, steiermark, " +
      "programming, developer, full stack, information manager, information management, ",
    _builddate: new Date(),
    _inject: injectFiles(dev), // holds all external client libs
    _gitrevision: argv.gitrevision ? argv.gitrevision.toString() : "no git revision set",
    _gitcommitcount: argv.gitcommitcount ? argv.gitcommitcount.toString() : "no git commit count",
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
  .use(includemetadata({
    metaKey: "includeMetadata",
    deleteFileAfterInclude: true
  }))
  .use(filetimestamp())
  .use(permapath({
    mode: "pre",
    absolute: {
      url: absoluteUrl,
      key: "pathuri"
    },
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
    marked: {
      gfm: true,
      breaks: true,
      tables: true,
      smartLists: true,
      smartypants: true
    },
    removeAttributeAfterwards: true
  }))
  .use(appendlightbox())
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