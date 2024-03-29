module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		less : {
			production : {
				options : {
					paths : [ 'public/Resources/less/' ]
				},
				files : {
					'public/Resources/css/base.css' : 'public/Resources/less/base.less'
				}
			}
		},
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			buildjs : {
				files : {
					'public/min/js/Build.min.js' : 'public/Resources/js/build/Build.js',
				}
			},
			browser : {
				files : {
					'public/min/js/Build.browser.min.js' : [ 'public/Resources/js/**/*.js', '!public/Resources/js/build/Build.js' ]
				}
			}
		},
		cssmin : {
			styles : {
				files : {
					'public/min/css/Build.min.css' : 'public/Resources/css/base.css'
				}
			}
		},
		forever : {
			main : {
				options : {
					index : 'server.js',
					logDir : 'logs'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-forever');

	grunt.registerTask('default', [ 'less', 'uglify', 'cssmin' ]);
	grunt.registerTask('forever-start', [ 'forever:main:start' ]);
	grunt.registerTask('forever-stop', [ 'forever:main:stop' ]);
	grunt.registerTask('forever-restart', [ 'forever:main:restart' ]);

};