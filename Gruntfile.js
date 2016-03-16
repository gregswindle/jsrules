// Generated on 2016-03-06 using generator-nodejs 3.2.0
'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    complexity: {
      generic: {
        src: ['app/**/*.js'],
        options: {
          errorsOnly: false,
          cyclometric: 6,       // default is 3
          halstead: 16,         // default is 8
          maintainability: 100  // default is 100
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'app/**/*.js',
        'src/**/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    mochacli: {
      all: ['test/**/*.js'],
      options: {
        reporter: 'spec',
        ui: 'tdd'
      }
    },
    watch: {
      js: {
        files: ['**/*.js', '!node_modules/**/*.js'],
        tasks: ['default'],
        options: {
          nospawn: true
        }
      }
    },
    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../test'
      }
    },
    /*jshint camelcase: false */
    mocha_istanbul: {
      coverage: {
          src: 'test', // a folder works nicely
          options: {
              mask: '*.js'
          }
      },
      coveralls: {
          src: ['test'], // multiple folders also works
          options: {
              coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
              check: {
                  lines: 100,
                  statements: 100
              },
              root: './src', // define where the cover task should consider the root of libraries that are covered by tests
              reportFormats: ['cobertura','lcovonly']
          }
      }
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
          check: {
            lines: 80,
            statements: 80
          }
        }
      }
    },
    coveralls: {
      options: {
        force: false
      },
      coverallsJsrules: {
        src: 'coverage/*.info'
      }
    }
  });

  grunt.event.on('coverage', function(lcovFileContents, done){
        // Check below on the section "The coverage event"
        done();
    });

  grunt.loadNpmTasks('grunt-mocha-istanbul');
  //grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);

  grunt.loadNpmTasks('grunt-coveralls');

  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.registerTask('test', ['complexity', 'jshint', 'mochacli', 'coverage', 'watch']);
  grunt.registerTask('ci', ['complexity', 'jshint', 'mochacli', 'coverage']);
  grunt.registerTask('default', ['test']);
};
