'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      }
    },

    clean: ['app.css'],

    sass: {
      options: {
        compass: true,
        require: ['sass-css-importer'],
        sourcemap: true
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'app.css': 'scss/app.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'app.css': 'scss/app.scss'
        }
      }
    },

    watch: {
      css: {
        files: 'scss/**/*',
        tasks: ['sass:dev']
      }
    }
  });

  [
    'grunt-contrib-clean',
    'grunt-contrib-concat',
    'grunt-contrib-sass',
    'grunt-contrib-uglify',
    'grunt-contrib-watch'
  ].forEach(grunt.loadNpmTasks.bind(grunt));


  grunt.registerTask('dev', [
    'clean',
    'sass:dev',
    'concat:dev',
    'watch'
  ]);
  grunt.registerTask('dist', [
    'clean',
    'sass:dist'
  ]);
  grunt.registerTask('default', ['dev']);

};
