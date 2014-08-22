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
      metalsmith: {
        files: ["src/**/*.*", "templates/**/*.*", "scripts/**/*.*", "support/**/*.*", "index.js", "config.json"],
        tasks: ["build-dev"],
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
      "support-root": {
        files: [{
          expand: true,
          flatten: true,
          nonull: true,
          src: "support/root/*",
          dest: "build/"
        }]
      },
      // "support-js": {
      //   files: [{
      //     expand: true,
      //     flatten: true,
      //     nonull: true,
      //     src: config.support.js,
      //     dest: "build/assets/js/"
      //   }]
      // },
      "vendor-css": {
        files: [{
          expand: true,
          flatten: true,
          nonull: true,
          src: config.vendor.css,
          dest: config.vendor.gruntTargetDir.css
        }]
      },
      "vendor-js": {
        files: [{
          expand: true,
          flatten: true,
          nonull: true,
          src: _.union(config.vendor.js, config.vendor.js_head),
          dest: config.vendor.gruntTargetDir.js
        }]
      }
    },
    clean: {
      prebuild: ["build"]
    },
    less: {
      development: {
        options: {
          paths: config.less.dirs
        },
        files: {
          "build/assets/css/style.css": config.less.src
        } // TODO: add grunt task from bootstrap source and run autoprefixer in the end!!!
      }
    }
  });

  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-http-server");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask("build-dev", ["execute", "copy", "less"]);
  grunt.registerTask("default", ["clean", "build-dev", "http-server:dev", "watch"]);

};