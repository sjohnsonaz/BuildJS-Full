Build('build.history.HashRouter', [], function(define, $super) {
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	function getParameterNames(functionHandle) {
		var definition = functionHandle.toString().replace(STRIP_COMMENTS, '');
		return definition.slice(definition.indexOf('(') + 1, definition.indexOf(')')).match(/([^\s,]+)/g) || [];
	}
	define({
		$constructor : function() {
			var self = this;
			this.routes = {};
			this.handler = function(event) {
				var url = (event && event.newURL) ? event.newURL : window.location.href;
				var routes = self.routes;
				for ( var route in routes) {
					if (routes.hasOwnProperty(route)) {
						var routeDef = routes[route];
						var params = url.match(routeDef.regex);
						if (params) {
							routeDef.enter.apply(routeDef.enter, params.slice(1));
						}
					}
				}
			};
		},
		$prototype : {
			listen : function() {
				window.addEventListener('hashchange', this.handler);
				this.handler();
			},
			stop : function() {
				window.removeEventListener('hashchange', this.handler);
			},
			add : function(route, enter, exit) {
				this.routes[route] = {
					route : route,
					enter : enter,
					exit : exit,
					regex : new RegExp(route.replace(/\//g, "\\/").replace(/:(\w*)/g, "(\\w*)"))
				};
			},
			remove : function(route) {
				delete this.routes[route];
			},
			watch : function(scope, name, prefix, callback) {
				var parameterNames = getParameterNames(callback);
				parameterNames.unshift(prefix);
				this.add('#/' + parameterNames.join('/:'), function() {
					callback.apply(scope, arguments);
				});
				var handle = function() {
					var parameterValues = Array.prototype.slice.call(arguments);
					parameterValues.unshift(prefix);
					window.location.hash = '#/' + parameterValues.join('/');
					return window.location.hash;
				};
				scope[name] = handle;
				return handle;
			},
			go : function() {

			}
		}
	});
});