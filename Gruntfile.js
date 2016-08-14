module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      all: {
        src : 'src/**/*.js',
        dest : 'build/output.min.js'
      }
    },
    less: {
      development: {
        files: {
          'src/css/style.css': 'src/css/style.less'
        }
      },
      production: {
        files: {
          'build/css/output.css': 'src/css/style.less'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'build/css/output.css': 'build/css/output.css'
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['less:development']);
  grunt.registerTask('production', ['uglify', 'less:production', 'cssmin']);

};