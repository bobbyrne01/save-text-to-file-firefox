module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'package.json', 'addon/package.json', 'addon/lib/*.js', 'addon/data/js/*.js'],
			options: {
				moz: true,
				force: true, // don't stop when there is an error
				maxerr: 10000 // keep running no matter how many errors were found
			}
		},
		jsbeautifier: {
			files: ['<%= jshint.files %>', 'addon/data/html/view.html', 'addon/data/css/style.css'],
			options: {
				js: {
					braceStyle: "collapse",
					breakChainedMethods: false,
					e4x: false,
					evalCode: false,
					indentChar: "\t",
					indentLevel: 0,
					indentSize: 1,
					indentWithTabs: true,
					jslintHappy: true,
					keepArrayIndentation: false,
					keepFunctionIndentation: false,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					spaceBeforeConditional: true,
					spaceInParen: false,
					unescapeStrings: false,
					wrapLineLength: 0
				},
				html: {
					braceStyle: "collapse",
					indentChar: "\t",
					indentScripts: "keep",
					indentSize: 1,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					unformatted: ["a", "sub", "sup", "b", "i", "u"],
					wrapLineLength: 0
				},
				css: {
					indentChar: "\t",
					indentSize: 1
				}
			}
		},
		htmllint: {
			all: {
				options: {
					ignore: 'Empty heading.'
				},
				src: "addon/data/html/*.html"
			}
		},
		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['addon/data/css/*.css']
			}
		},
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 2,
				success: true
			}
		},
		release: {
			options: {
				file: 'package.json',
				additionalFiles: ['addon/package.json'],
				bump: true,
				add: true,
				commit: true,
				tag: true,
				push: true,
				pushTags: true,
				npm: false,
				npmtag: false,
				github: {
					repo: 'bobbyrne01/save-text-to-file-firefox',
					usernameVar: 'GITHUB_USERNAME',
					passwordVar: 'GITHUB_PASSWORD'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-jsbeautifier");
	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-release');

	grunt.registerTask('default', ['jsbeautifier', 'jshint', 'htmllint', 'csslint']);
	grunt.task.run('notify_hooks');
};
