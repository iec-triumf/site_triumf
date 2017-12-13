module.exports = function(grunt){
	var gc = {
		imageNotyfy: __dirname+'\\src\\notify.png',
		minifyHtml: false,
		minifyCss: false,
		projectName: 'Сайт ТРИУМФ',
		template: "triumf"
	};
	var files = [ 
		'bower_components/Jarallax/source/jarallax.js',
		'bower_components/Jarallax/source/jarallax_tools.js',
		'bower_components/Jarallax/source/jarallax_controller.js',
		'bower_components/Jarallax/source/jarallax_counter.js',
		'bower_components/Jarallax/source/jarallax_object.js',
		'bower_components/Jarallax/source/jarallax_animation.js',
		'bower_components/Jarallax/source/controllers/*.js',
		'bower_components/Jarallax/import/*/*.js'
	]
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		modernizr: {
			dist: {
				"crawl": false,
				"customTests": [],
				"dest": "assets/templates/<%= globalConfig.template%>/js/modernizr.js",
				"tests": [
					"flexbox",
					"svg",
					"smil",
					"objectfit",
					"cssvhunit",
					"cssvwunit",
				],
				"options": [
					"setClasses"
				],
				"uglify": true
			}
		},
		concat: {
			jarallax: {
				src: files,
				dest: 'test/js/jarallax.js'
			},
			yepnope: {
				src: [
					'bower_components/yepnope/dist/yepnope-2.0.0.min.js'
				],
				dest: 'assets/templates/<%= globalConfig.template%>/js/yepnope.js'
			}
		},
		uglify : {
			options: {
				ASCIIOnly: true
			},
			app: {
				files: {
					'assets/templates/<%= globalConfig.template%>/js/app.js' : [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jquery.easing/jquery.easing.js',
						'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.js',
						'bower_components/jquery-mousewheel/jquery.mousewheel.js',
						'bower_components/jquery.scroolly/src/jquery.scroolly.js',
						'bower_components/slick-carousel/slick/slick.js',
						'bower_components/parallax.js/parallax.js',
						'bower_components/wow/dist/wow.js',
						'bower_components/fancybox/dist/jquery.fancybox.js',
						'bower_components/arcticModal/arcticmodal/jquery.arcticmodal.js',
						'bower_components/jquery_lazyload/jquery.lazyload.js',
						'test/js/jarallax.js'
					]
				}
			},
			hypher: {
				files: {
					'assets/templates/<%= globalConfig.template%>/js/hypher.js' : [
						'bower_components/hyphernationRUru/dist/jquery.hypher.js',
						'bower_components/hyphernationRUru/dist/ru-ru.js',
					]
				}
			},
			main: {
				files: {
					'assets/templates/<%= globalConfig.template%>/js/main.js': [
						'src/js/dropdown.js',
						'src/js/main.js',
					]
				}
			}
		},
		less: {
			css: {
				files : {
					'test/css/main.css' : [
						'src/css/main.less'
					]
				},
				options : {
					compress: gc.minifyCss,
					ieCompat: false
				}
			}
		},
		autoprefixer:{
			options: {
				browsers: ['last 2 versions', 'Android 4', 'ie 8', 'ie 9', 'Firefox >= 27', 'Opera >= 12.0', 'Safari >= 6'],
				cascade: false
			},
			normalize: {
				expand: true,
				flatten: true,
				src: [
					'bower_components/normalize-css/normalize.css'
				],
				dest: 'test/css/main_pref/'
			},
			css: {
				expand: true,
				flatten: true,
				src: [
					'test/css/main.css'
				],
				dest: 'test/css/main_pref/'
			}
		},
		cssmin: {
			target: {
				files: {
					'assets/templates/<%= globalConfig.template%>/css/main.css': [
						'test/css/main_pref/main.css'
					],
					'assets/templates/<%= globalConfig.template%>/css/normalize.css': [
						'test/css/main_pref/normalize.css'
					]
				}
			}
		},
		jade: {
			files: {
				options: {
					pretty: !gc.minifyHtml,
					data: {
						debug: false
					}
				},
				files: {
					"index.php": [
						"src/html/index.jade"
					],
				}
			},
		},
		imagemin: {
			base: {
				options: {
					optimizationLevel: 7,
					//progressive: true,
					//interlaced: true,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/*.{png,jpg,gif,svg}'
						],
						dest: 'assets/templates/<%= globalConfig.template%>/images/',
						filter: 'isFile'
					}
				]
			},
			css: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/css/*.{png,jpg,gif,svg}'
						],
						dest: 'src/images/bin/',
						filter: 'isFile'
					}
				]
			}
		},
		notify: {
			watch: {
				options: {
					title: "<%= globalConfig.projectName %> v<%= pkg.version %>",
					message: 'Запуск',
					image: '<%= globalConfig.imageNotyfy %>'
				}
			},
			done: {
				options: { 
					title: "<%= globalConfig.projectName %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: '<%= globalConfig.imageNotyfy %>'
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: [
					'src/html/**/*.php',
					'src/html/**/*.jade',
					'src/html/**/*.tpl',
				],
				tasks: [
					'jade',
					'notify:done'
				]
			},
			js: {
				files: [
					'src/js/**/*.js'
				],
				tasks: [
					'notify:watch',
					'concat',
					'uglify',
					'jade',
					'notify:done'
				]
			},
			css: {
				files: [
					'src/css/**/*.{css,less}',
				],
				tasks: [
					'notify:watch',
					'less',
					'autoprefixer',
					'cssmin',
					'jade',
					'notify:done'
				]
			},
			img: {
				files: [
					'src/images/*.{png,jpg,gif,svg}',
				],
				tasks: [
					'notify:watch',
					'imagemin:base',
					'less',
					'autoprefixer',
					'cssmin',
					'jade',
					'notify:done'
				]
			},
			imgcss: {
				files: [
					'src/images/css/*.{png,jpg,gif,svg}',
				],
				tasks: [
					'notify:watch',
					'imagemin:css',
					'less',
					'autoprefixer',
					'cssmin',
					'jade',
					'notify:done'
				]
			}
		}
	});
	grunt.registerTask('default', 	[
		'notify:watch',
		'imagemin',
		'modernizr',
		'concat',
		'uglify',
		'less',
		'autoprefixer',
		'cssmin',
		'jade',
		'notify:done'
	]);
	grunt.registerTask('dev', 	[
		'watch'
	]);
}