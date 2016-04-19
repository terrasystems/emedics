'use strict';
//
module.exports = function(grunt) {
	require('load-grunt-config')(grunt);
	var serveStatic = require('serve-static');
	var srcConfig = {
		host: 'www.home.eu',
		src: require('./bower.json').srcPath || 'src',
		dist: 'dist',
		bowercomp: 'lib',
		oneSkyId: '103909',
		proxi: {
			context: '/web',
			context2: '/query_services',
			context3: '/actions',
			context4: '/reports',
			context5: '/change_pwd',
			host: '198.199.75.87',
			port: '81'
		}
	};
/*	var oneSkyoptions = function(lang) {
		return {
			sourceFile: 'translation_en.json',
			output: 'translation_' + lang + '.json',
			exportType: 'locale',
			locale: lang
		};
	};*/
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		yeoman: srcConfig,
		connect: {
			options: {
				port: 3000,
				hostname: '*',
				livereload: 35729,
				//debug: true,
				//logger: 'dev',
				middleware: function(connect) {
					// Setup the proxy
					var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
					return [
						proxy,
						connect().use('/lib', serveStatic('./lib')),
						connect().use('/src/css', serveStatic('./src/css')),
						serveStatic(srcConfig.dist)
					];
				}
			},
			proxies: [
				{
					context: '<%= yeoman.proxi.context %>',
					host: '<%= yeoman.proxi.host %>',
					port: '<%= yeoman.proxi.port %>',
					https: false,
					//xforward: false,
					//changeOrigin: true,
					rewrite: {
						'^/web': '/web'
					}
				},
				{
					context: '<%= yeoman.proxi.context2 %>',
					host: '<%= yeoman.proxi.host %>',
					port: '<%= yeoman.proxi.port %>',
					https: false,
					//xforward: false,
					//changeOrigin: true,
					rewrite: {
						'^/query_services': '/query_services'
					}
				},
				{
					context: '<%= yeoman.proxi.context3 %>',
					host: '<%= yeoman.proxi.host %>',
					port: '<%= yeoman.proxi.port %>',
					https: false,
					//xforward: false,
					//changeOrigin: true,
					rewrite: {
						'^/actions': '/actions'
					}
				},
				{
					context: '<%= yeoman.proxi.context4 %>',
					host: '<%= yeoman.proxi.host %>',
					port: '<%= yeoman.proxi.port %>',
					https: false,
					//xforward: false,
					//changeOrigin: true,
					rewrite: {
						'^/reports': '/reports'
					}
				},
				{
					context: '<%= yeoman.proxi.context5 %>',
					host: '<%= yeoman.proxi.host %>',
					port: '<%= yeoman.proxi.port %>',
					https: false,
					//xforward: false,
					//changeOrigin: true,
					rewrite: {
						'^/change_pwd': '/change_pwd'
					}
				}
			],
			livereload: {
				options: {
					open: true,
					middleware: function(connect) {
						// Setup the proxy
						var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
						return [
							proxy,
							connect().use('/lib', serveStatic('./lib')),
							connect().use('/src/css', serveStatic('./src/css')),
							serveStatic(srcConfig.dist)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= yeoman.dist %>',
					livereload: false
				}
			}
		},
		//export translations from oneSky service
		//include src
		includeSource: {
			options: {
				basePath: 'src',
				baseUrl: './',
				templates: {
					html: {
						js: '<script src="{filePath}"></script>',
						css: '<link rel="stylesheet" href="{filePath}" />'
					}
				}
			},
			serve: {
				files: {
					'<%= yeoman.dist %>/index.html': '<%= yeoman.src %>/index.tpl.html'
				}
			},
			dist: {
				files: {
					'<%= yeoman.dist %>/index.html': '<%= yeoman.src %>/index.tpl.html'
				}
			}
		},
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep:serve']
			},
			html: {
				files: [
					'<%= yeoman.src %>/modules/**/{,*/}*.html'
				],
				tasks: ['newer:copy:serve', 'newer:copy:dist'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			js: {
				files: [
					'<%= yeoman.src %>/js/{,*/}*.js',
					'<%= yeoman.src %>/i18n/{,*/}*.json',
					'<%= yeoman.src %>/modules/**/{,*/}*.js'
				],
				tasks: ['newer:copy:serve'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			styles: {
				files: ['<%= yeoman.src %>/css/{,*/}*.css'],
				tasks: ['newer:copy:serve'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			includeSource: {
				files: ['<%= yeoman.src %>/index.tpl.html'],
				tasks: ['includeSource:serve']
			}
		},
		//
		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			apps: {
				options: {
					jshintrc: '<%= yeoman.src %>/.jshintrc'
				},
				src: [
					'Gruntfile.js',
					'<%= yeoman.src %>/{,*/}*.js'
				]
			},
			test: {
				options: {
					jshintrc: 'tests/.jshintrc'
				},
				src: ['tests/spec/{,*/}*.js']
			}
		},
		//include bower components(vendors)
		wiredep: {
			serve: {
				src: ['<%= yeoman.dist %>/index.html'],
				ignorePath: 'src/',
				exclude: ['<%= yeoman.bowercomp %>/jquery/', '<%= yeoman.bowercomp %>/requirejs/', '<%= yeoman.bowercomp %>/bootstrap/dist/js/']
			},
			dist: {
				src: ['<%= yeoman.dist %>/index.html'],
				//ignorePath: '/src',
				exclude: ['<%= yeoman.bowercomp %>/jquery/', '<%= yeoman.bowercomp %>/requirejs/', '<%= yeoman.bowercomp %>/bootstrap/dist/js/']
			}
		},
		//
		useminPrepare: {
			html: '<%= yeoman.dist %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>',
				root: '<%= yeoman.src %>',
				flow: {
					html: {
						steps: {
							js: [
								'concat',
								'uglifyjs'
							],
							css: [
								'cssmin'
							]
						},
						post: {}
					}
				}
			}
		},
		//
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: [
					'<%= yeoman.dist %>',
					'<%= yeoman.dist %>/images'
				]
			}
		},
		// https://www.npmjs.com/package/grunt-angular-templates
		ngtemplates: {
			miniApp: {
				cwd: '<%= yeoman.src %>',
				src: 'modules/**/{,*/}*.html',
				dest: '<%= yeoman.dist %>/template.js',
				options: {
					module: 'miniApp',
					append: '<%= yeoman.dist %>',
					usemin: 'app.js',
					htmlmin: {
						collapseWhitespace: true,
						conservativeCollapse: true,
						removeScriptTypeAttributes: true,
						removeEmptyAttributes: true,
						removeComments: true
					}
				}
			}
		},
		concat: {
			options: {
				separator: '\n/*! <%= grunt.template.today("dd/mm/yyyy") %> */',
				stripBanners: true,
				banner: '\n/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
			}
		},
		cssmin: {
			options: {
				//keepBreaks: true
			}
		},
		uglify: {
			options: {}
		},
		ngAnnotate: {
			options: {
				singleQuotes: true
					//,regexp: '^(rome){0}'
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat',
					src: [
						'*.js'
					],
					dest: '.tmp/concat'
				}]
			}
		},
		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
						expand: true,
						dot: true,
						cwd: '<%= yeoman.src %>',
						dest: '<%= yeoman.dist %>',
						src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'i18n/{,*/}*.*',
						'index2.html',
						'lib/{,*/}**'
					]
				},  {
						expand: true,
						cwd: '<%= yeoman.src %>',
						src: ['images/{,*/}*.*', 'fonts/{,*/}*.*'],
						dest: '<%= yeoman.dist %>'
				}
				]
			},
			serve: {
				files: [
					{ //
						expand: true,
						cwd: '<%= yeoman.src %>',
						src: ['css/{,*/}*.*', 'modules/**/{,*/}*.*', 'js/{,*/}*.js', 'Guardfile'],
						dest: '<%= yeoman.dist %>'
					}
				]
			}
		},
		clean: {
			options: {
				force: true
			},
			temp: {
				src: ['.tmp']
			},
			dist: {
				src: ['<%= yeoman.dist %>', '.tmp']
			}
		},
		// replace
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: '$compileProvider.debugInfoEnabled(false);',
							replacement: '$compileProvider.debugInfoEnabled(false);'
						}
					],
					prefix: '//'
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ['.tmp/concat/app.js'],
						dest: '.tmp/concat/'
					}
				]
			}
		}
	});
	grunt.registerTask('build', [
		//'oneskyExport',
		'clean:dist',
		'includeSource:dist',
		'wiredep:dist',
		'useminPrepare',
		'ngtemplates',
		'concat',
		'replace:dist',
		'ngAnnotate:dist',
		'copy:dist',
		'cssmin',
		'uglify',
		'usemin']);
	grunt.registerTask('serve', [
		//'oneskyExport',
		'clean:dist',
		'includeSource:serve',
		'wiredep:serve',
		'copy:dist',
		'copy:serve',
		'configureProxies',
		'connect:livereload',
		'watch']);
};
