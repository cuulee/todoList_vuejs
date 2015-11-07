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
		watch: {
			options: { 
				livereload: true 
			},
			src: {
				files: [
					'styles.sass'
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
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['sass','watch']);

};