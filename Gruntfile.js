module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      all: {
        src : 'src/output.js',
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
    },
    watch: {
      styles: {
        files: ['**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      code: {
        files: ['src/**/*.js', '!src/output.js'],
        tasks: ['concat']
      }
    },
    concat: {
      options: {
        separator: ';\n',
      },
      code: {
        src : ['src/**/*.js', '!src/output.js'],
        dest : 'src/output.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['less:development', 'concat', 'watch:code']);
  grunt.registerTask('production', ['concat', 'uglify', 'less:production', 'cssmin']);

};