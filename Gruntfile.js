var _ = require("lodash");
var config = require("./config.json");

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
        files: ["src/**/*.*", "templates/**/*.*", "scripts/**/*.*", "index.js", "config.json"],
        tasks: ["less", "execute"],
        options: {
          interrupt: false,
          livereload: true
        }
      }
    },
    "http-server": {
      dev: {
        root: "build",
        port: 8080,
        host: "127.0.0.1",
        cache: -1,
        showDir: true,
        autoIndex: true,
        defaultExt: "html",
        runInBackground: true
      }
    },
    copy: {
      bower_components: {
        files: [{
          expand: true,
          flatten: true,
          nonull: true,
          src: _.union(config.vendor.css, config.vendor.js, config.vendor.js_head),
          dest: config.vendor.dist
        }]
      }
    },
    clean: {
      prebuild: ["build", "src/assets/vendor"]
    },
    less: {
      development: {
        options: {
          paths: config.less.dirs
        },
        files: {
          "src/assets/css/style.css": config.less.src
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-http-server");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask("default", ["clean", "copy", "less", "execute", "http-server:dev", "watch"]);
};