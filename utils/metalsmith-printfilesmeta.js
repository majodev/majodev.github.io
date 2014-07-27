
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to output current filetree (+ meta keys)
 *
 * @return {Function}
 */

function plugin(){
  return function(files, metalsmith, done){
    for (var file in files) {
      console.log("- " + file + " (" + Object.keys(files[file]) + ")");
    }
    done();
  };
}