module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'addon/lib/*.js', 'addon/test/test-utils.js', 'addon/data/js/*.js'],
      options: {
        moz: true,
        force: true, // don't stop when there is an error
        maxerr: 10000 // keep running no matter how many errors were found
      }
    },
    watch: {
      files: [ '<%= jshint.files %>' ],
      tasks: [ 'jshint' ]
    },
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 2,
        success: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
  grunt.task.run('notify_hooks');
};
