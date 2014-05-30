module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // import project settings from package.json
        pkg: grunt.file.readJSON("package.json"),

        clean: {
            build: { src: ["build"] }
        },

        jasmine : {
            // always include all the specs
            options : {
                // start with minim core, then do the rest - but don't do minim core twice!
                specs : ["test/spec/minim.spec.js", ["test/spec/**/*.spec.js", "!test/spec/minim.spec.js"]]
            },
            // test pre-build files
            testSrc : {
                src : ["src/minim.js", "src/minim/**/*.js", "src/**/*.js"],
            },
            // test concatenated files
            testConcat : {
                src : ["build/minim.js", "build/**/*.js", "!build/**/*.min.js"],
            },
            // test minified files
            testMin : {
                src : ["build/minim.min.js", "build/**/*.min.js"],
            }
        },

        jshint: {
            // lint all source files
            all: [ "src/**/*.js" ]
        },

        concat: {
            build: { src: ["src/minim.js", "src/minim/**/*.js"], dest: "build/minim.js" }
            // { src: ["src/BigInteger/BigInteger.js"],     dest: "build/minim-biginteger.js" }
        },

        uglify: {
            build: {
                files: [
                    { src: ["build/minim.js"],            dest: "build/minim.min.js" },
                    { src: ["build/minim-biginteger.js"], dest: "build/minim-biginteger.min.js" }
                ]
            },
            options: {
                banner: "/**\n"
                    + " * <%= pkg.name %> <%= pkg.homepage %>\n"
                    + " * \n"
                    + " * <%= pkg.description %>\n"
                    + " * \n"
                    + " * @version     <%= pkg.version %> built <%= grunt.template.today(\"yyyy-mm-dd HH:mm:ss\") %>\n"
                    + " * @copyright Copyright © 2013-<%= grunt.template.today(\"yyyy\") %> <%= pkg.author %>\n"
                    + " * @license     <%= pkg.license %>\n"
                    + "**/\n"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("test", ["jshint", "jasmine:testSrc"]);

    grunt.registerTask("build", ["jshint", "clean:build", "concat:build", "jasmine:testConcat", "uglify", "jasmine:testMin"]);

    grunt.registerTask("travis", ["jshint", "concat:build", "uglify", "jasmine:testMin"]);

};
