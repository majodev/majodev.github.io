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
        files: ["content/**/*.*", "templates/**/*.*", "utils/**/*.*", "index.js"],
        tasks: ["execute"],
        options: {
          interrupt: false,
          livereload: true
        }
      }
    },
    'http-server': {
        'dev': {
            // the server root directory
            root: "build",
            port: 8080,
            host: "127.0.0.1",
            cache: -1,
            showDir : true,
            autoIndex: true,
            defaultExt: "html",
            // run in parallel with other tasks
            runInBackground: true
        }
    }
  });

  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-http-server');

  grunt.registerTask("default", ["execute", "http-server:dev" ,"watch"]);
};