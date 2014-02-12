var express = require('express');

module.exports = function(Build) {
	Build('build.mvc.server.FileServer', [ 'node::build.mvc.server.Server' ], function(define, $super) {
		define({
			$extends : 'build.mvc.server.Server',
			$constructor : function(config) {
				$super(this)(config);
				var app = express();
				this.app = app;
				this.system = {};
				this.system.app = app;
				this.system.config = config;

				app.configure(function() {
					app.use(config.staticDirectory, express.compress());
					app.use(config.staticDirectory, express.static(config.staticPath, {
						maxAge : 86400000
					}));
					app.use(express.methodOverride());
					app.use(app.router);
				});
				app.configure('development', function() {
					app.use(express.errorHandler({
						dumpExceptions : true,
						showStack : true
					}));
				});
				app.configure('production', function() {
					app.use(express.errorHandler());
				});
			},
			$prototype : {
				start : function() {
					var self = this;
					this.app.listen(this.config.port, function() {
						console.log('Listening on port ' + self.config.port);
					});
				}
			},
			$static : {

			}
		});
	});
};