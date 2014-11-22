var _ = require("lodash");
var config = require("./config.json");

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    execute: {
      "metalsmith-dev": {
        options: {
          args: ["--gitrevision", "commit/<%=grunt.option('gitRevision')%>", "--gitcommitcount", "<%=grunt.option('gitCommitCount')%>"]
        },
        src: ["index.js"]
      },
      "metalsmith-dev-noclean": {
        options: {
          args: ["--gitrevision", "commit/<%=grunt.option('gitRevision')%>", "--gitcommitcount", "<%=grunt.option('gitCommitCount')%>", "--noclean"]
        },
        src: ["index.js"]
      },
      "metalsmith-productive": {
        options: {
          args: ["--productive", "--gitrevision", "commit/<%=grunt.option('gitRevision')%>", "--gitcommitcount", "<%=grunt.option('gitCommitCount')%>"]
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
    bgShell: {
      _defaults: {
        bg: true
      },
      "testserver-gzip": {
        cmd: 'node scripts/testserver-gzip.js'
      }
    },
    watch: {
      options: {
        interrupt: false,
        livereload: true,
        spawn: false
      },
      "metalsmith": {
        files: ["src/**/*.*", "templates/**/*.*", "scripts/**/*.*", "index.js", "config.json"],
        tasks: ["execute:metalsmith-dev-noclean"]
      },
      "support-less": {
        files: ["support/less/**/*.*"],
        tasks: ["less:development"]
      },
      "support-root": {
        files: ["support/root/**/*.*"],
        tasks: ["copy:support-root"]
      },
      "support-img": {
        files: ["support/img/**/*.*"],
        tasks: ["copy:support-img"]
      },
      "support-js": {
        files: ["support/js/**/*.*"],
        tasks: ["browserify:dev", "copy:inject-js"]
      },
      "support-resume": {
        files: ['support/static/resume/*.xtx'],
        tasks: ['resume', "copy:support-static"]
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
      "support-img": {
        files: [{
          expand: true,
          flatten: false,
          nonull: true,
          cwd: "support/img/",
          src: "**",
          dest: "build/assets/img/"
        }]
      },
      "support-root": {
        files: [{
          expand: true,
          flatten: true,
          nonull: true,
          src: "support/root/*",
          dest: "build/"
        }]
      },
      "support-static": {
        files: [{
          expand: true,
          flatten: false,
          nonull: true,
          cwd: "support/static/",
          src: ["**/*.pdf", "**/*.png"],
          dest: "build/static/"
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
      temporary: ["_tmp"],
      "gh-pages": [".grunt"],
      "favicons": ["support/img/favicons", "templates/base/favicons.hbs"],
      latextempFiles: ["support/static/resume/*.aux", "support/static/resume/*.log", "support/static/resume/*.out"]
    },
    less: {
      development: {
        options: {
          sourceMap: true,
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
      },
      css_src: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'build/', // Src matches are relative to this path.
          src: ['**/*.css'], // Actual pattern(s) to match.
          dest: 'build/', // Destination path prefix.
          ext: '.css', // Dest filepaths will have this extension.
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
        "devFile": "node_modules/modernizr/dist/modernizr-build.js", // [REQUIRED] Path to the build you're using for development.
        "outputFile": "_tmp/modernizr-custom.js", // [REQUIRED] Path to save out the built file.
        "extra": { // Based on default settings on http://modernizr.com/download/
          "shiv": true,
          "printshiv": true,
          "load": true, // yepnope
          "mq": true, // add support for media queryies
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
            "src/**/*.js", "src/**/*.css", "src/**/*.less",
            "support/**/*.js", "support/**/*.css", "support/**/*.less",
            "templates/**/*.js", "templates/**/*.css", "templates/**/*.less",
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
      temporary: {
        expand: true,
        cwd: '_tmp/',
        src: ['**/*.css'],
        dest: '_tmp/'
      },
      css_src: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'build/', // Src matches are relative to this path.
          src: ['**/*.css'], // Actual pattern(s) to match.
          dest: 'build/', // Destination path prefix.
          ext: '.css', // Dest filepaths will have this extension.
        }]
      }
    },
    "git-describe": {
      "options": {
        template: "{%=object%}{%=dirty%}"
      },
      repo: {},
    },
    shell: {
      options: {
        stderr: true
      },
      init_modernizr_dependencies: {
        command: [
          "cd node_modules/modernizr",
          "npm install -d"
        ].join("&&")
      },
      build_modernizr: {
        command: [
          "cd node_modules/modernizr",
          "grunt build"
        ].join("&&")
      },
      "casperjs": {
        command: [
          "casperjs scripts/404checker.js http://localhost:8080/"
        ].join("&&")
      },
      "commitCount": {
        command: "git rev-list HEAD --count",
        options: {
          callback: function saveCount(err, stdout, stderr, cb) {
            //console.log("commit count: [" + stdout.trim() + "]");
            grunt.option('gitCommitCount', stdout.trim());
            cb();
          }
        }
      },
      "resume-pdf": {
        command: [
          "cd support/static/resume",
          'xelatex -halt-on-error resume.xtx', // requires latex distribution installed
        ].join('&&')
      },
      "resume-png": {
        command: [
          "cd support/static/resume",
          "sips -s format png resume.pdf --out resume.png" // osx only, via native sips task
          // "convert -alpha off -density 400 -resize 35% resume.pdf resume.png" // requires imagemackis!
        ].join('&&')
      }
    },
    browserify: {
      dev: {
        files: {
          '_tmp/support-bundle.js': ["support/js/main.js"],
        },
        options: {
          browserifyOptions: {
            debug: true
          }
        }
      },
      productive: {
        files: {
          '_tmp/support-bundle.js': ["support/js/main.js"],
        },
        options: {
          browserifyOptions: {
            debug: false
          }
        }
      }
    },
    lodash: {
      build: {
        dest: '_tmp/lodash-custom.js',
        options: {
          flags: [
            "--debug"
          ],
          exports: ['global']
          // lodash-autobuild will add this after analysis of source code
          // include: "names, of, lodash, methods, in, your, source" 
        }
      }
    },
    lodashAutobuild: {
      // Multiple autobuild targets supported
      app: {
        // The path to your source file(s)
        src: ['support/js/**/*.js', "src/**/*.js"],
        // Default options:
        options: {
          // Set to the configured lodash task options.include
          lodashConfigPath: 'lodash.build.options.include',
          // The name(s) of the lodash object(s)
          lodashObjects: ['_'],
          // Undefined lodashTargets or an empty targets
          // array will run all lodash targets. Specify
          // targets by name to run specific targets
          lodashTargets: ['build']
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'build',
        branch: "master",
        message: "Generated from branch source commit <%=grunt.option('gitRevision')%>"
      },
      src: '**/*'
    },
    confirm: {
      'long': {
        options: {
          question: "Publish commit <%=grunt.option('gitRevision')%>?\n(type 'PUBLISH' to continue)",
          continue: function(answer) {
            return answer === 'PUBLISH';
          }
        }
      },
      'short': {
        options: {
          question: "Publish commit <%=grunt.option('gitRevision')%>?\n(ENTER to continue)",
          continue: function(answer) {
            return true;
          }
        }
      }
    },
    favicons: {
      options: {
        apple: true, // platform
        firefox: true, // platform
        androidHomescreen: true, // platform
        windowsTile: true, // platform
        coast: true, // platform
        trueColor: true,
        appleTouchBackgroundColor: "#7bd9f2",
        tileBlackWhite: false,
        tileColor: "",
        html: 'templates/base/favicons.hbs',
        HTMLPrefix: "/assets/img/favicons/"
      },
      icons: {
        src: 'dev/fav/favicon.png',
        dest: 'support/img/favicons'
      }
    }
  });

  // ---
  // load required tasks
  // ---

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
  grunt.loadNpmTasks('grunt-git-describe');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-lodash');
  grunt.loadNpmTasks('grunt-lodash-autobuild');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-confirm');
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-favicons');

  // ---
  // main tasks
  // ---

  grunt.registerTask("init", [
    "shell:init_modernizr_dependencies", "shell:build_modernizr"
  ]);

  grunt.registerTask("default", [
    "build-pre", "build-dev", "http-server:dev", "watch"
  ]);

  grunt.registerTask("productive", [
    "build-pre", "build-productive", "bgShell:testserver-gzip", "confirm:long", 'gh-pages'
  ]);

  grunt.registerTask("publish", [
    "build-pre", "build-productive", "confirm:short", 'gh-pages'
  ]);

  grunt.registerTask("resume", [
    "clean:latextempFiles", "shell:resume-pdf", "shell:resume-png", 'clean:latextempFiles'
  ]);


  // -- 
  // pre build task
  // --
  grunt.registerTask("build-pre", [
    "clean:temporary", "modernizr", "lodashAutobuild"
  ]);


  // ---
  // dev tasks
  // ---

  grunt.registerTask("build-dev", [
    "clean:build", "browserify:dev", "get-git-revision", "shell:commitCount", "execute:metalsmith-dev", "less:development", "copy"
  ]);

  grunt.registerTask("fav", [
    "clean:favicons", "favicons"
  ]);

  // ---
  // productive tasks
  // ---

  grunt.registerTask("build-productive", [
    "clean:build", "browserify:productive", "get-git-revision", "shell:commitCount",
    "execute:metalsmith-productive",
    "css-productive", "js-productive",
    "htmlmin", "copy:support-root", "copy:support-img", "copy:support-static",
    "copy:inject-fonts", "xmlmin"
  ]);

  grunt.registerTask("css-productive", [
    "autoprefixer:css_src", "cssmin:css_src", "less:productive", "autoprefixer:temporary", "cssmin:combine"
  ]);

  grunt.registerTask("js-productive", [
    "uglify:js_src", "uglify:js", "uglify:js_head"
  ]);

  // ---
  // webserver tasks
  // ---

  grunt.registerTask("server", [
    "execute:testserver-gzip"
  ]);

  grunt.registerTask("serverdelay", [
    "execute:testserver-gzip-delay"
  ]);

  grunt.registerTask("linkcheck", [
    "http-server:dev", "shell:casperjs"
  ]);

  // ---
  // minor tasks
  // ---

  grunt.registerTask('get-git-revision', function() {
    grunt.event.once('git-describe', function(rev) {
      //console.log(rev);
      grunt.option('gitRevision', rev.toString());
    });
    grunt.task.run('git-describe');
  });

};