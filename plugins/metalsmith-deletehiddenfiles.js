
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to delete hidden osx files from file tree (before build)
 *
 * @return {Function}
 */

function plugin(){
  return function(files, metalsmith, done){
    for (var file in files) {
      if(file[0] === "." || file.indexOf("/.") !== -1) { // delete any hidden files (osx)
        delete files[file];
      }
    }
    done();
  };
}