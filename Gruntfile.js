var _ = require("lodash");
var config = require("./config.json");

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    execute: {
      "metalsmith-dev": {
        src: ["index.js"]
      },
      "metalsmith-productive": {
        options: {
          args: ["productive"]
        },
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
      "inject-css": {
        files: [{
          expand: true,
          flatten: true,
          nonull: true,
          src: config.inject.css,
          dest: config.inject.gruntTargetDir.css
        }]
      },
      "inject-js": {
        files: [{
          expand: true,
          flatten: true,
          nonull: true,
          src: _.union(config.inject.js, config.inject.js_head),
          dest: config.inject.gruntTargetDir.js
        }]
      }
    },
    clean: {
      prebuild: ["build"]
    },
    less: {
      development: {
        options: {
          paths: config.inject.less.dirs
        },
        files: [{
          src: [config.inject.less.src],
          dest: config.inject.less.dest
        }] // TODO: add grunt task from bootstrap source and run autoprefixer in the end!!!
      }
    }
  });

  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-http-server");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');

  
  grunt.registerTask("default", ["clean", "build-dev", "http-server:dev", "watch"]);
  grunt.registerTask("build-dev", ["execute:metalsmith-dev", "less", "copy"]);
  grunt.registerTask("build-productive", ["execute:metalsmith-productive", "less", "copy"]);

};