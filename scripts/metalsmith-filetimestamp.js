// adapted from https://raw.githubusercontent.com/jkuczm/metalsmith-mtime/master/lib/index.js

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var each = require('async').each;
var debug = require('debug')('metalsmith-filetimestamp');
var _ = require("lodash");


/**
 * Expose `plugin`.
 */

module.exports = plugin;


/**
 * A Metalsmith plugin that adds files mtimes to their metadata.
 *
 * @return {Function}
 * @api public
 */

function plugin() {
  return addAllMtimes;
}


/**
 * Adds files mtimes to all corresponding objects in `files`.
 *
 * @param {Object} files
 * @param {Object} metalsmith
 * @param {Function} done
 * @api private
 */

function addAllMtimes(files, metalsmith, done) {

  var source = metalsmith.source();

  // File system will be accessed for each element so iterate in parallel.
  each(Object.keys(files), getAddMtime, done);


  /**
   * Gets mtime of given `file` and adds it to metadata.
   *
   * @param {String} file
   * @param {Function} done
   * @api private
   */

  function getAddMtime(file, done) {
    fs.stat(path.join(source, file), addMtime);


    /**
     * Adds `stats.mtime` of `file` to its metadata.
     *
     * @param {Error} err
     * @param {fs.Stats} stats
     * @api private
     */

    function addMtime(err, stats) {
      if (err) {
        // Skip elements of `files` that don't point to existing files.
        // This can happen if some other Metalsmith plugin does something
        // strange with `files`.
        if (err.code === 'ENOENT') {
          debug('file %s not found', file);
          return done();
        }
        return done(err);
      }

      debug('mtime of file %s is %s', file, stats.mtime);
      files[file].lastModified = stats.mtime;
      
      if(_.isUndefined(files[file].date) === true) {
        files[file].date = stats.ctime;
      }

      done();
    }
  }
}