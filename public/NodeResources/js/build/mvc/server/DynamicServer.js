var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var engine = require('ejs-locals');
var mongoStore = require('connect-mongo')(express);
var ejs = require('ejs');

module.exports = function(Build) {
	/**
	 * @class build.mvc.server.DynamicServer
	 * @extends build.mvc.server.Server
	 */
	Build('build.mvc.server.DynamicServer', [ 'buildnode::build.mvc.server.Server', 'buildnode::build.mvc.database.Database' ], function($define, $super) {
		$define({
			$extends : 'build.mvc.server.Server',
			/**
			 * @constructor
			 */
			$constructor : function DynamicServer(config) {
				$super(this)(config);
				var app = express();
				this.app = app;
				this.system = {};
				this.system.app = app;
				this.system.config = config;

				app.configure(function() {
					app.engine('ejs', engine);
					app.set('views', config.viewPath);
					app.set('view engine', 'ejs');
					app.set('layout', 'layout');
					app.set('view options', {
						pretty : true
					});
					app.use(express.compress());
					app.use(expressLayouts);
					for (var index = 0, length = config.staticPaths.length; index < length; index++) {
						var staticPath = config.staticPaths[index];
						app.use(staticPath.virtual, express.static(staticPath.local, {
							maxAge : 86400000
						}));
					}
					app.use(express.favicon(config.icon));
					app.use(express.logger('dev'));
					app.use(express.bodyParser());
					app.use(express.methodOverride());
					app.use(express.cookieParser(config.cookieSecret));
					app.use(express.session({
						secret : config.session.cookieSecret,
						store : new mongoStore(config.session.database, function() {
							console.log('Session database connection success...');
						}),
						maxAge : config.session.maxAge
					}));
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

				this.database = new build.mvc.database.Database(this.config.mongodb.host, this.config.mongodb.port, this.config.mongodb.database, this.config.mongodb.username, this.config.mongodb.password, this.config.mongooseConnection);
				app.database = this.database;

				function buildDefaultRoutes() {
					// app.all('/',
					// system.controllers[config.defaultController].index);
					// app.all('*',
					// controllers[config.errorController].index);
				}
			},
			$prototype : {
				start : function(callback) {
					var self = this;
					this.database.init(function() {
						self.app.listen(self.config.port, function() {
							console.log('Listening on port ' + self.config.port);
							typeof (callback) == 'function' ? callback() : false;
						});
					});
				}
			},
			$static : {}
		});
	});
};