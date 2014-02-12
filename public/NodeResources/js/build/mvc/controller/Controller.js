module.exports = function(Build) {
	Build('build.mvc.Controller', [], function(define, $super) {
		Build.root.system.controllers = {};
		define({
			$constructor : function() {
			},
			$prototype : {
				route : function(app, params) {
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
								app.all(routeString, this.permissionTest);
								break;
							case 'get':
								app.get(routeString, this.permissionTest);
								break;
							case 'post':
								app.post(routeString, this.permissionTest);
								break;
							case 'put':
								app.put(routeString, this.permissionTest);
								break;
							case 'delete':
								app.del(routeString, this.permissionTest);
								break;
							}
						}
					}
					return method;
				},
				permissionTest : function(request, response) {
					if (!permissions) {
						permissions = [];
					} else if (!Array.isArray(permissions)) {
						permissions = [ permissions ];
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