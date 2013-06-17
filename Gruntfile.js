module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({

    // import project settings from package.json
    pkg: grunt.file.readJSON('package.json'),

    jasmine : {
      // test pre-build files in src/
      testSrc : {
        src : 'src/**/*.js',
        options : {
          specs : 'test/tests/**/*.js'
        }
      },
      // test files after build in build/
      testBuild : {
        src : 'build/**/*.js',
        options : {
          specs : 'test/tests/**/*.js'
        }
      }
    },
    jshint: {
      all: [
        // 'Gruntfile.js',
        'src/**/*.js',
        'test/tests/**/*.js'
      ],
      options: {
      }
    },

  "name":        "minim",
  "description": "Mathematics library for JavaScript",

  "version":     "0.0.0-unstable",

  "keywords":    [ "math", "maths", "BigInteger" ],
  "homepage":    "http://www.minimmaths.org/",
  "bugs":        "http://github.com/MrAnchovy/minim-js/issues",
  "license":     "MIT",
  "author":      "MrAnchovy (http://www.mranchovy.com/)",
  "repository":  "https://github.com/MrAnchovy/minim-js",

    uglify: {
      options: {
        banner: '/**\n'
          + ' * <%= pkg.name %> <%= pkg.homepage %>\n'
          + ' * <%= pkg.description %>\n'
          + ' * \n'
          + ' * @version   <%= pkg.version %> built <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %>\n'
          + ' * @copyright Copyright © <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'
          + ' * @license   <%= pkg.license %>\n'
          + '**/\n'
      },
      
      build: {
        files: [
          { src:  'src/<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.js'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jshint', 'jasmine:testSrc']);
  grunt.registerTask('testBuild', ['jshint', 'jasmine:testBuild']);

  grunt.registerTask('default', ['test', 'uglify', 'testBuild']);

};
