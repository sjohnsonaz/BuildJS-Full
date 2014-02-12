var express = require('express');

module.exports = function(Build) {
	// 'build.mvc.Database', 'build.mvc.Permission', 'build.mvc.Helper', 'build.mvc.Widget', 'build.mvc.Controller', 'build.mvc.Model' 
	Build('build.mvc.server.DynamicServer', [], function(define, $super) {
		define({
			$constructor : function(config) {
				var self = this;
				this.config = config;
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
				start: function () {
					var self = this;
					this.app.listen(this.config.port, function() {
						console.log('Listening on port ' + self.config.port);
					});
				},
				oldConstructor : function(config) {

					var express = require('express');
					var expressLayouts = require('express-ejs-layouts');
					var engine = require('ejs-locals');
					var mongoStore = require('connect-mongo')(express);
					var fs = require('fs');
					var path = require('path');
					var url = require('url');
					var ejs = require('ejs');
					var async = require('async');

					var Database = build.mvc.Database;
					var Permission = build.mvc.Permission;
					var Helper = build.mvc.Helper;
					var Widget = build.mvc.Widget;
					var Controller = build.mvc.Controller;
					var Model = build.mvc.Model;

					var config = require('./config');
					this.config = config;
					var app = express();

					var system = {};
					system.app = app;
					system.config = config;

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
						app.use(config.staticDirectory, express.static(config.staticPath));
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

					app.locals.Html = {};

					Database = Database(system);
					Permission = Permission(system);
					Helper = Helper(system);
					Widget = Widget(system);
					Controller = Controller(system);
					Model = Model(system);

					Database.initialize(function() {
						initialize(function() {
							listen();
						});
					});

					function initialize(callback) {
						Permission.loadPermissions(config.permissionPath);
						Helper.loadHelpers(system.config.helperPath);
						Widget.loadWidgets(system.config.widgetPath);
						Controller.loadControllers(config.controllerPath);
						Model.loadModels(config.modelPath);
						buildDefaultRoutes();
						callback();
					}

					function listen(callback) {
						app.listen(config.port, function() {
							console.log('Listening on port ' + config.port);
							typeof (callback) == 'function' ? callback() : false;
						});
					}

					function buildDefaultRoutes() {
						// app.all('/',
						// system.controllers[config.defaultController].index);
						// app.all('*',
						// controllers[config.errorController].index);
					}
				}
			},
			$static : {

			}
		});
	});
};