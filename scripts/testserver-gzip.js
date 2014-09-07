//
// Simple static HTTP server that uses gzip compression (if client accepts gzip encoding)
// by Richard Dancsi, www.wimagguc.com
// modified from https://github.com/wimagguc/nodejs-static-http-with-gzip/blob/master/http-with-gzip.js
//

var DOCUMENT_ROOT = './build';
var DIRECTORY_INDEX = '/index.html';

var port = process.env.PORT || 8080;

var zlib = require('zlib');
var http = require('http');
var path = require('path');
var fs = require('fs');
var _ = require("lodash");

var argv = require('minimist')(process.argv.slice(2));

var emulateDelayMaxMS = argv.maxdelay > 0 ? argv.maxdelay : 0;
var emulateDelayMinMS = argv.mindelay > 0 ? argv.mindelay : 0;


http.createServer(function(request, response) {

  var delay = getRandomInt(emulateDelayMinMS, emulateDelayMaxMS);

  console.log("serving " + request.url + " with " + delay + "ms delay...");

  setTimeout(function() {

    // Remove query strings from uri
    if (request.url.indexOf('?') > -1) {
      request.url = request.url.substr(0, request.url.indexOf('?'));
    }

    // Remove query strings from uri
    if (request.url == '/') {
      request.url = DIRECTORY_INDEX;
    }
    var filePath = DOCUMENT_ROOT + request.url;

    var extname = path.extname(filePath);

    var acceptEncoding = request.headers['accept-encoding'];
    if (!acceptEncoding) {
      acceptEncoding = '';
    }

    // path.exists is now called `fs.exists`.
    fs.exists(filePath, function(exists) {

      var stat;

      try {
        stat = fs.lstatSync(filePath);
      } catch (e) {
        stat = false;
      }


      if (exists) {

        if (stat !== false && stat.isDirectory() === true) { // catch paths with index.html in directory!
          if (fs.lstatSync(filePath + "index.html").isFile() === true) {
            filePath = filePath + "index.html";
          }
        }

        fs.readFile(filePath, function(error, content) {
          if (error) {
            console.log(error);
            response.writeHead(500);
            response.end();
          } else {
            var raw = fs.createReadStream(filePath);

            if (acceptEncoding.match(/\bdeflate\b/)) {
              response.writeHead(200, {
                'content-encoding': 'deflate'
              });
              raw.pipe(zlib.createDeflate()).pipe(response);
            } else if (acceptEncoding.match(/\bgzip\b/)) {
              response.writeHead(200, {
                'content-encoding': 'gzip'
              });
              raw.pipe(zlib.createGzip()).pipe(response);
            } else {
              response.writeHead(200, {});
              raw.pipe(response);
            }
          }
        });
      } else {
        response.writeHead(404);
        response.end();
      }
    });

  }, delay);

}).listen(port);

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  var delay = Math.floor(Math.random() * (max - min + 1)) + min;
  if (min === 0 && max === 0) {
    return 0;
  }

  return delay;
}

console.log('Serving compressed files on http://localhost:' + port + " mindelay: " + emulateDelayMinMS + " maxdelay: " + emulateDelayMaxMS);