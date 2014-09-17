// via https://gist.github.com/n1k0/4509789
// adapted to really check all internal links (there was a counter error oO)
// added option to check external links
// see "EDIT" flags in code

/**
 * This casper scipt checks for 404 internal AND EXTERNAL links for a given root url.
 *
 * Usage:
 *
 *     $ casperjs 404checker.js http://mysite.tld/
 *     $ casperjs 404checker.js http://mysite.tld/ --max-depth=42
 */

/*global URI*/

var CHECK_EXTERNAL_LINK_AVAILABILITY = true; // even if true links on external pages will NOT be scraped!

var casper = require("casper").create({
  verbose: true,
  pageSettings: {
    loadImages: false,
    loadPlugins: false
  }
});
var checked = [];
var linkErrors = [];
var currentLink = 0;
var fs = require('fs');
var upTo = ~~casper.cli.get('max-depth') || 9007199254740992;
var url = casper.cli.get(0);
var baseUrl = url;
var links = [url];
var utils = require('utils');
var f = utils.format;

function absPath(url, base) {
  return new URI(url).resolve(new URI(base)).toString();
}

// Clean links
function cleanLinks(urls, base) {
  return utils.unique(urls).filter(function(url) {
    // EDIT: don't filter out external links.
    if (CHECK_EXTERNAL_LINK_AVAILABILITY) {
      return true;
    } else {
      return url.indexOf(baseUrl) === 0 || !new RegExp('^(#|ftp|javascript|http)').test(url);
    }
  }).map(function(url) {
    return absPath(url, base);
  }).filter(function(url) {
    return checked.indexOf(url) === -1;
  });
}

// Opens the page, perform tests and fetch next links
function crawl(link) {
  this.start().then(function() {
    //this.echo(link, 'COMMENT');
    if (link.indexOf(baseUrl) === 0) {
      this.open(link);
    } else {
      // request head only on external pages
      this.open(link, {
        method: "head"
      });
    }

    checked.push(link);
  });
  this.then(function() {
    if (this.currentHTTPStatus === 404) {
      casper.echo(countStatus() + link + ' is missing (HTTP 404)', "ERROR");
      linkErrors.push(link + ' is missing (HTTP 404)');
    } else if (this.currentHTTPStatus === 500) {
      casper.echo(countStatus() + link + ' is broken (HTTP 500)', "ERROR");
      linkErrors.push(link + ' is broken (HTTP 500)');
    } else {
      this.echo(countStatus() + link + f(' is okay (HTTP %s)', this.currentHTTPStatus));
    }
  });
  // EDIT: allow external link checking but and scrape links from them!
  if (link.indexOf(baseUrl) === 0 && link.indexOf(".pdf") === -1) {
    this.then(function() {
      var newLinks = searchLinks.call(this);
      links = unique(links.concat(newLinks).filter(function(url) {
        return checked.indexOf(url) === -1;
      }));
      // this.echo(newLinks.length + " new links found on " + link);
    });
  } else {
    links = unique(links.filter(function(url) {
      return checked.indexOf(url) === -1;
    }));
    // don't scrape external links further, just stop
  }
}

function countStatus() {
  var uniqueArr = unique(links.concat(checked));
  return currentLink + "/" + uniqueArr.length + ": ";
}

function unique(arr) {
  var hash = {},
    result = [];
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (!hash.hasOwnProperty(arr[i])) { //it works with objects! in FF, at least
      hash[arr[i]] = true;
      result.push(arr[i]);
    }
  }
  return result;
}

// Fetch all <a> elements from the page and return
// the ones which contains a href starting with 'http://'
function searchLinks() {
  return cleanLinks(this.evaluate(function _fetchInternalLinks() {
    return [].map.call(__utils__.findAll('a[href]'), function(node) {
      return node.getAttribute('href');
    });
  }), this.getCurrentUrl());
}

// As long as it has a next link, and is under the maximum limit, will keep running
function check() {
  // EDIT: always take the first child in array
  // links array is of dynamic length, counter is a bad idea here!
  var nextLink = links[0];
  if (nextLink && currentLink < upTo) {
    // console.log(links);
    links.splice(0, 1);
    crawl.call(this, nextLink);
    currentLink++;
    this.run(check);
  } else {
    this.echo("All done, " + checked.length + " unique links checked. " + linkErrors.length + " errors.", "INFO");
    for (var i = linkErrors.length - 1; i >= 0; i--) {
      this.echo("error: " + linkErrors[i], "ERROR");
    }
    this.exit();
  }
}

if (!url) {
  casper.warn('No url passed, aborting.').exit();
}

casper.start('https://js-uri.googlecode.com/svn/trunk/lib/URI.js', function() {
  var scriptCode = this.getPageContent() + '; return URI;';
  window.URI = new Function(scriptCode)();
  if (typeof window.URI === "function") {
    this.echo('URI.js loaded');
  } else {
    this.warn('Could not setup URI.js').exit();
  }
});

casper.run(process);

function process() {
  casper.start().then(function() {
    this.echo("Running 404checker...");
  }).run(check);
}