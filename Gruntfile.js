module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    execute: {
      build: {
        src: ["index.js"]
      }
    },
    watch: {
      scripts: {
        files: ["content/**/*.*", "templates/**/*.*", "index.js"],
        tasks: ["execute"],
        options: {
          interrupt: false,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["execute", "watch"]);
};