var fs = require('fs');
var path = require('path');
module.exports = function(Build) {
	Build('build.mvc.Controller', [], function(define, $super) {
		Build.root.system.controllers = {};
		define({
			$constructor : function() {

			},
			$prototype : {},
			$static : {
				loadControllers : function(basePath) {
					var self = this;
					var files = fs.readdirSync(basePath);
					for (x in files) {
						var file = files[x];
						if (path.extname(file) == '.js') {
							var controllerName = path.basename(file, '.js');
							var controllerPath = basePath + '/' + file;
							self.load(controllerName, controllerPath);
						}
					}
				},
				load : function(controllerName, controllerPath) {
					var self = this;
					var controller = require(controllerPath);
					var route = function(params) {
						var defaultParams = {
							verb : 'all',
							route : null,
							permission : null,
							restful : false,
							method : null
						};
						params.verb = params.verb || defaultParams.verb;
						// params.route = params.route || defaultParams.route;
						params.permission = params.permission || defaultParams.permission;
						params.restful = params.restful || defaultParams.restful;
						// params.method = params.method ||
						// defaultParams.method;
						if (!params.route || !params.method) {
							throw "missing parameters in route";
						}

						var permissions = params.permission;
						var verbs = params.verb;
						var routeStrings = params.route;
						var method = params.method;

						var permissionTest = function(request, response) {
							if (!permissions) {
								permissions = [];
							} else if (!Array.isArray(permissions)) {
								permissions = [ permissions ];
							}
							for ( var permissionIndex = 0; permissionIndex < permissions.length; permissionIndex++) {
								var permission = permissions[permissionIndex];
								if (typeof (permission) == 'string') {
									permissions[permissionIndex] = system.permission[permission];
								}
							}
							var permissionResult = true;
							for ( var permissionIndex = 0; permissionIndex < permissions.length; permissionIndex++) {
								var permission = permissions[permissionIndex];
								permissionResult = permission(request, response);
								if (!permissionResult) {
									break;
								}
							}
							if (permissionResult) {
								var output;
								if (params.restful) {
									output = function(data) {
										response.send(data);
									};
									method(request, response, output);
								} else {
									var data = {
										layout : 'layoutMain',
										title : '',
										instance : {
											request : request,
											response : response
										},
										main : {}
									};
									output = function(view, data) {
										if (data.widgets) {
											self.renderWidgets(request, response, data.widgets, function(widgets) {
												data.widgets = widgets;
												response.render(view, data);
											});
										} else {
											response.render(view, data);
										}
									};
									method(request, response, output, data);
								}
							} else {
								response.send(false);
							}
						};
						if (typeof (verbs) == 'string') {
							verbs = [ verbs ];
						}
						if (typeof (routeStrings) == 'string') {
							routeStrings = [ routeStrings ];
						}
						for ( var routeIndex = 0; routeIndex < routeStrings.length; routeIndex++) {
							var routeString = routeStrings[routeIndex];
							for ( var index = 0; index < verbs.length; index++) {
								var verbString = verbs[index];
								switch (verbString) {
								case 'all':
									system.app.all(routeString, permissionTest);
									break;
								case 'get':
									system.app.get(routeString, permissionTest);
									break;
								case 'post':
									system.app.post(routeString, permissionTest);
									break;
								case 'put':
									system.app.put(routeString, permissionTest);
									break;
								case 'delete':
									system.app.del(routeString, permissionTest);
									break;
								}
							}
						}
						return method;
					};
					var define = function(construct, proto, routes) {
						construct.prototype = proto || {};
						for ( var y in routes) {
							var route = routes[y];
							construct.prototype[y] = route;
						}
						system.controllers[controllerName] = construct;
						console.log('Added controller:  ' + controllerName);
					};
					controller(system, define, route);
				},
				renderWidgets : function(request, response, widgets, callback) {
					/*
					 * var tasks = {}; for ( var name in data.main.widgets) {
					 * var widgetData = data.main.widgets[name];
					 * console.log(name); tasks[name] = function(callback) { var
					 * widgetName = widgetData.name; var rendered =
					 * system.widgets[widgetName].render(request, response,
					 * widget); callback(null, rendered); }; }
					 * async.parallel(tasks, function(err, results) {
					 * data.main.widgets = results; if (err) { } else { }
					 * console.log(data.main.widgets); });
					 */
					callback(widgets);
				}
			}
		});
	});
};