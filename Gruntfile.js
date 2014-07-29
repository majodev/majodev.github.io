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
        files: ["src/**/*.*", "templates/**/*.*", "scripts/**/*.*", "index.js"],
        tasks: ["execute"],
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
          src: ["bower_components/normalize.css/normalize.css",
          "bower_components/jquery/dist/jquery.js", 
          "bower_components/history.js/scripts/bundled-uncompressed/html4+html5/jquery.history.js"],
          dest: "src/assets/vendor/"
        }]
      }
    },
    clean: {
      prebuild: ["build", "src/assets/vendor"]
    }
  });

  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-http-server");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask("default", ["clean", "copy", "execute", "http-server:dev", "watch"]);
};