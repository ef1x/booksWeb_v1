// The actual grunt server settings
module.exports =  function (grunt) {
  'use strict';
  return {
    options: {
      port: grunt.option('port') || 1337,
      livereload: grunt.option('livereload') || 35729,
      // Change this to '0.0.0.0' to access the server from outside
      hostname: grunt.option('hostname') || 'localhost'
//        middleware: grunt.option('middleware') || function (connect, options, middlewares) {
//            // inject a custom middleware
//            middlewares.unshift(function (req, res, next) {
//                res.setHeader('Access-Control-Allow-Origin', '*');
//                res.setHeader('Access-Control-Allow-Methods', '*');
//                //a console.log('foo') here is helpful to see if it runs
//                return next();
//            });
//
//            return middlewares;
//        }
    },
    livereload: {
      options: {
                open: true,
          base: [
              '.tmp',
              '<%= config.app %>'
          ],
          middleware: function (connect, options, middlewares) {
            // inject a custom middleware
            middlewares.unshift(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                console.log('foo');
                return next();
            });

            return middlewares;
        }
      }
    },
    dist: {
      options: {
        open: true,
        base: '<%= config.dist %>',
        livereload: false
      }
    }

  };
};


