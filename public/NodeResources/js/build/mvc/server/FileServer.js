var express = require('express');

module.exports = function(Build) {
	/**
	 * @class build.mvc.server.FileServer
	 * @extends build.mvc.server.Server
	 */
	Build('build.mvc.server.FileServer', [ 'buildnode::build.mvc.server.Server' ], function(define, $super) {
		define({
			$extends : 'build.mvc.server.Server',
			/**
			 * @constructor
			 */
			$constructor : function FileServer(config) {
				$super(this)(config);
				var app = express();
				this.app = app;
				this.system = {};
				this.system.app = app;
				this.system.config = config;

				app.configure(function() {
					app.use(express.compress());
					for (var index = 0, length = config.staticPaths.length; index < length; index++) {
						var staticPath = config.staticPaths[index];
						app.use(staticPath.virtual, express.static(staticPath.local, {
							maxAge : 86400000
						}));
					}
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
				start : function(callback) {
					var self = this;
					this.app.listen(this.config.port, function() {
						console.log('Listening on port ' + self.config.port);
						typeof (callback) == 'function' ? callback() : false;
					});
				}
			},
			$static : {

			}
		});
	});
};