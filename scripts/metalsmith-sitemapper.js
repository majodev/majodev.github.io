// extracted from https://github.com/ExtraHop/metalsmith-sitemap/blob/master/lib/index.js
// original plugin wasn't published in npm and i felt it needed some customizations

var fs = require('fs'),
  Handlebars = require('handlebars'),
  _ = require('lodash'),
  defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
    return _.merge(value, other, deep);
  }),
  resolve = function(object, property) {
    return _.reduce(property.split('.'), function(o, p) {
      return o ? o[p] : undefined;
    }, object);
  };

var extname = require('path').extname;
var moment = require("moment");

module.exports = plugin;

function plugin(options) {
  options = options || {};

  var templatesDir = __dirname + '/sitemapper';

  defaultsDeep(options, {
    ignoreFiles: [],
    output: 'sitemap.xml',
    modifiedProperty: 'modified',
    urlProperty: 'path',
    entryTemplate: templatesDir + '/entry.xml.hbs',
    sitemapTemplate: templatesDir + '/sitemap.xml.hbs',
    defaults: {
      priority: 0.5,
      changefreq: 'daily'
    }
  });

  var entryTemplate = fs.readFileSync(options.entryTemplate, {
    encoding: 'utf8'
  });
  var sitemapTemplate = fs.readFileSync(options.sitemapTemplate, {
    encoding: 'utf8'
  });

  entryTemplate = Handlebars.compile(entryTemplate);
  sitemapTemplate = Handlebars.compile(sitemapTemplate);

  return function(files, metalsmith, done) {
    var entries,
      entry,
      file,
      data;

    entries = _(Object.keys(files)).map(function(file) {
      data = files[file];

      if (html(file) === false) {
        return;
      }

      if (!shouldIgnore(file) || data.noRobots) {
        return;
      }

      data.sitemap = data.sitemap || {};

      var relativePath = resolve(data, options.urlProperty);
      var absolutePath = options.absoluteUrl;
      if(_.isUndefined(relativePath)) {
        relativePath = file;
      }

      entry = _.defaults({
        loc: absolutePath + relativePath, //resolve(data, options.urlProperty),
        lastmod: moment(resolve(data, options.modifiedProperty)).toISOString(),
        changefreq: data.sitemap.changefreq,
        priority: data.sitemap.priority
      }, options.defaults);

      return entryTemplate(entry);
    }).compact().join('');

    var contents = sitemapTemplate({
      entries: entries
    });
    files[options.output] = {
      contents: new Buffer(contents)
    };

    done();
  };

  function shouldIgnore(file) {
    return !_.some(options.ignoreFiles, function(ignore) {
      return ignore.test(file);
    });
  }
}

function error(file, message) {
  return message + '\nFile: ' + file +
    '\nTo skip validation on this file add it to the ' +
    'ignoreFiles array.\n\n';
}

/**
 * Check if a `file` is html.
 *
 * @param {String} file
 * @return {Boolean}
 */

function html(file) {
  return /\.html?/.test(extname(file));
}