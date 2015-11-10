module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				outputStyle: 'compressed',
			},
			dist: {
				files: {
					'static/styles.css': ['styles.sass'],
				}
			}
		},
		bower_concat: {
		all: {
			dest: 'static/bower.js',
			cssDest: 'bower.scss',
			bowerOptions: {
	  				relative: false
			}
  		}
		},
		watch: {
			options: { 
				livereload: true 
			},
			src: {
				files: [
					'styles.sass',
					'static/index.html',
					'static/fe_app.js'
				],
				tasks: ['sass'],
			},
		},
		connect: {
			server: {
				options: {
					base: '_site',
					port: 4400,
				}
			}
		},
	});


	
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['bower_concat','sass','watch']);

};