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
          args: ["--productive"]
        },
        src: ["index.js"]
      },
      "testserver-gzip": {
        src: ["scripts/testserver-gzip.js"]
      },
      "testserver-gzip-delay": {
        options: {
          args: ["--maxdelay", "2500", "--mindelay", "250"]
        },
        src: ["scripts/testserver-gzip.js"]
      }
    },
    watch: {
      "metalsmith": {
        files: ["src/**/*.*", "templates/**/*.*", "scripts/**/*.*", "index.js", "config.json"],
        tasks: ["build-dev"],
        options: {
          interrupt: false,
          livereload: true
        }
      },
      "support-less": {
        files: ["support/less/**/*.*"],
        tasks: ["less:development"],
        options: {
          interrupt: false,
          livereload: true
        }
      },
      "support-root": {
        files: ["support/root/**/*.*"],
        tasks: ["copy:support-root"],
        options: {
          interrupt: false,
          livereload: true
        }
      },
      "support-js": {
        files: ["support/js/**/*.*"],
        tasks: ["copy:inject-js"],
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
      options: {
        force: true
      },
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
        }] // TODO: run autoprefixer in the end!!!
      },
      productive: {
        options: {
          optimization: 2,
          paths: config.inject.less.dirs
        },
        files: [{
          src: [config.inject.less.src],
          dest: "_tmp/style.css"
        }] // TODO: run autoprefixer in the end!!!
      }
    },
    cssmin: {
      options: {
        report: "gzip",
        keepSpecialComments: 0,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 'build <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */'
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
        preserveComments: false,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 'build <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
        // compress: {
        //   drop_console: true
        // }
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
    xmlmin: { // Task
      dist: { // Target
        options: { // Target options
          preserveComments: false
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'build/', // Src matches are relative to this path.
          src: ['**/*.xml'], // Actual pattern(s) to match.
          dest: 'build/', // Destination path prefix.
          ext: '.xml', // Dest filepaths will have this extension.
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
        "devFile": "bower_components/modernizr/modernizr.js", // [REQUIRED] Path to the build you're using for development.
        "outputFile": "_tmp/modernizr-custom.js", // [REQUIRED] Path to save out the built file.
        "extra": { // Based on default settings on http://modernizr.com/download/
          "shiv": true,
          "printshiv": false,
          "load": false, // exclude yepnope for now, we will enable it if shims are really needed!
          "mq": false,
          "cssclasses": true
        },
        "extensibility": { // Based on default settings on http://modernizr.com/download/
          "addtest": false,
          "prefixed": false,
          "teststyles": false,
          "testprops": false,
          "testallprops": false,
          "hasevents": false,
          "prefixes": false,
          "domprefixes": false
        },
        "uglify": false,
        "tests": [], // Define any tests you want to implicitly include.
        "parseFiles": true, // By default, this task will crawl your project for references to Modernizr tests.
        "files": {
          "src": [
            "src/**/*.js", "src/**/*.css", "src/**/*.less", "src/**/*.hbs", "src/**/*.md", "src/**/*.html",
            "support/**/*.js", "support/**/*.css", "support/**/*.less", "support/**/*.hbs", "support/**/*.md", "support/**/*.html",
            "templates/**/*.js", "templates/**/*.css", "templates/**/*.less", "templates/**/*.hbs", "templates/**/*.md", "templates/**/*.html"
          ]
        },
        "matchCommunityTests": false,
        "customTests": [] // Have custom Modernizr tests? Add paths to their location here.
      }
    },
    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      tempo: {
        expand: true,
        cwd: '_tmp/',
        src: ['**/*.css'],
        dest: '_tmp/'
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
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-xmlmin');

  grunt.registerTask("default", [
    "clean:temporary", "modernizr", "build-dev", "http-server:dev", "watch"
  ]);

  grunt.registerTask("productive", [
    "clean", "modernizr", "build-productive", "clean:temporary", "server"
  ]);

  grunt.registerTask("server", [
    "execute:testserver-gzip"
  ]);

  grunt.registerTask("serverdelay", [
    "execute:testserver-gzip-delay"
  ]);

  grunt.registerTask("build-dev", [
    "clean:build", "execute:metalsmith-dev", "less:development", "copy"
  ]);

  grunt.registerTask("build-productive", [
    "execute:metalsmith-productive", "css-productive", "uglify:js_src",
    "uglify:js", "uglify:js_head", "htmlmin", "copy:support-root",
    "copy:inject-fonts", "xmlmin"
  ]);

  grunt.registerTask("css-productive", [
    "less:productive", "autoprefixer", "cssmin:combine"
  ]);
};