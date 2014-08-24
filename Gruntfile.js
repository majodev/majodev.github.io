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
      },
      productive: {
        root: "build",
        port: 8080,
        host: "127.0.0.1",
        cache: -1,
        showDir: true,
        autoIndex: true,
        defaultExt: "html",
        runInBackground: false
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
      "inject-fonts": {
        files: [{
          expand: true,
          flatten: true,
          nonull: true,
          src: config.inject.fonts,
          dest: config.inject.gruntTargetDir.fonts
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
      build: ["build"],
      temporary: ["_tmp"]
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
      },
      productive: {
        options: {
          paths: config.inject.less.dirs
        },
        files: [{
          src: [config.inject.less.src],
          dest: "_tmp/style.css"
        }] // TODO: add grunt task from bootstrap source and run autoprefixer in the end!!!
      }
    },
    cssmin: {
      options: {
        report: "gzip"
      },
      combine: {
        files: [{
          src: _.union(config.inject.css, ["_tmp/style.css"]),
          dest: config.inject.gruntTargetDir.css + config.inject.productive.css
        }]
      }
    },
    uglify: {
      options: {
        report: "gzip",
        compress: {
          drop_console: true
        }
      },
      js: {
        files: [{
          src: config.inject.js,
          dest: config.inject.gruntTargetDir.js + config.inject.productive.js
        }]
      },
      js_head: {
        files: [{
          src: config.inject.js_head,
          dest: config.inject.gruntTargetDir.js + config.inject.productive.js_head
        }]
      },
      js_src: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'build/', // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'build/', // Destination path prefix.
          ext: '.js', // Dest filepaths will have this extension.
        }]
      }
    },
    htmlmin: { // Task
      build: { // Target
        options: { // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'build/', // Src matches are relative to this path.
          src: ['**/*.html'], // Actual pattern(s) to match.
          dest: 'build/', // Destination path prefix.
          ext: '.html', // Dest filepaths will have this extension.
        }]
      }
    },
    imagemin: {
      options: { // Target options
        optimizationLevel: 7
      },
      dynamic: { // Another target
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: '', // Src matches are relative to this path
          src: ['src/**/*.{png,jpg,gif}', 'support/**/*.{png,jpg,gif}'], // Actual patterns to match
          dest: '' // Destination path prefix
        }]
      }
    },
    modernizr: {

      dist: {
        // [REQUIRED] Path to the build you're using for development.
        "devFile": "bower_components/modernizr/modernizr.js",

        // [REQUIRED] Path to save out the built file.
        "outputFile": "_tmp/modernizr-custom.js",

        // Based on default settings on http://modernizr.com/download/
        "extra": {
          "shiv": true,
          "printshiv": false,
          "load": true,
          "mq": false,
          "cssclasses": true
        },

        // Based on default settings on http://modernizr.com/download/
        "extensibility": {
          "addtest": false,
          "prefixed": false,
          "teststyles": false,
          "testprops": false,
          "testallprops": false,
          "hasevents": false,
          "prefixes": false,
          "domprefixes": false
        },

        // By default, source is uglified before saving
        "uglify": false,

        // Define any tests you want to implicitly include.
        "tests": [],

        // By default, this task will crawl your project for references to Modernizr tests.
        // Set to false to disable.
        "parseFiles": true,

        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
        // You can override this by defining a "files" array below.
        "files": {
          "src": [
            "src/**/*.js", "src/**/*.css", "src/**/*.less", "src/**/*.hbs", "src/**/*.md", "src/**/*.html",
            "support/**/*.js", "support/**/*.css", "support/**/*.less", "support/**/*.hbs", "support/**/*.md", "support/**/*.html",
            "templates/**/*.js", "templates/**/*.css", "templates/**/*.less", "templates/**/*.hbs", "templates/**/*.md", "templates/**/*.html"
          ]
        },

        // When parseFiles = true, matchCommunityTests = true will attempt to
        // match user-contributed tests.
        "matchCommunityTests": false,

        // Have custom Modernizr tests? Add paths to their location here.
        "customTests": []
      }

    }
  });

  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-http-server");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks("grunt-modernizr");

  grunt.registerTask("default", ["clean", "modernizr", "build-dev", "http-server:dev", "watch"]);
  grunt.registerTask("productive", ["clean", "modernizr", "build-productive", "clean:temporary", "server"]);
  grunt.registerTask("server", ["http-server:productive"]);

  grunt.registerTask("build-dev", ["execute:metalsmith-dev", "less:development", "copy"]);
  grunt.registerTask("build-productive", ["imagemin", "execute:metalsmith-productive", "css-productive", "uglify:js_src", "uglify:js", "uglify:js_head", "htmlmin", "copy:support-root", "copy:inject-fonts"]);

  grunt.registerTask("css-productive", ["less:productive", "cssmin:combine"]);
};