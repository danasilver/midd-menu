module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'static/assets/<%= pkg.name %>.min.js': ['static/js/midd-menu.js']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js', 'static/js/*.js', 'config/**/*.js', 'lib/*.js', 'server.js'],
      options: {
        jshintrc: '<%= pkg.jshintConfig %>'
      }
    },
    less: {
      development: {
        files: {
          'static/assets/main.css': 'static/less/main.less'
        }
      },
      production: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {
          'static/assets/main.css': 'static/less/main.less'
        }
      }
    },
    nodemon: {
      def: {
        options: {
          file: 'server.js',
          nodeArgs: ['--debug'],
          env: {
            PORT: '5000'
          }
        }
      }
    },
    watch: {
      files: ['*'],
      tasks: ['jshint', 'uglify', 'less:development', 'nodemon']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['jshint', 'uglify', 'less']);

  grunt.registerTask('watch', ['jshint', 'uglify', 'less:development', 'nodemon']);
};