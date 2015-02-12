/**
 * @class build.mvc.controller.Controller
 */
module.exports = function(Build) {
	Build('build.mvc.controller.Controller', [], function($define, $super) {
		$define({
			/**
			 * @constructor
			 */
			$constructor : function Controller(app) {
				this.app = app;
			},
			$prototype : {
				route : function(params) {
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
					var method = params.method.bind(this);

					if (typeof (verbs) == 'string') {
						verbs = [ verbs ];
					}
					if (typeof (routeStrings) == 'string') {
						routeStrings = [ routeStrings ];
					}
					var permissionTest = function(request, response) {
						if (!permissions) {
							permissions = [];
						} else if (!Array.isArray(permissions)) {
							permissions = [ permissions ];
						}
						var permissionResult = true;
						for (var permissionIndex = 0; permissionIndex < permissions.length; permissionIndex++) {
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
									layout : 'layout',
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
					for (var routeIndex = 0; routeIndex < routeStrings.length; routeIndex++) {
						var routeString = routeStrings[routeIndex];
						for (var index = 0; index < verbs.length; index++) {
							var verbString = verbs[index];
							switch (verbString) {
							case 'all':
								this.app.all(routeString, permissionTest);
								break;
							case 'get':
								this.app.get(routeString, permissionTest);
								break;
							case 'post':
								this.app.post(routeString, permissionTest);
								break;
							case 'put':
								this.app.put(routeString, permissionTest);
								break;
							case 'delete':
								this.app.del(routeString, permissionTest);
								break;
							}
						}
					}
					return method;
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