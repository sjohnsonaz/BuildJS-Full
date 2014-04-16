/**
 * @class build.history.HashRouter
 */
Build('build.history.HashRouter', [], function(define, $super, helper) {
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	function getParameterNames(functionHandle) {
		var definition = functionHandle.toString().replace(STRIP_COMMENTS, '');
		return definition.slice(definition.indexOf('(') + 1, definition.indexOf(')')).match(/([^\s,]+)/g) || [];
	}
	define({
		/**
		 * @constructor
		 * @property routes
		 * @property handler
		 */
		$constructor : function HashRouter() {
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
			/**
			 * @method listen
			 */
			listen : function() {
				window.addEventListener('hashchange', this.handler);
				this.handler();
			},
			/**
			 * @method stop
			 */
			stop : function() {
				window.removeEventListener('hashchange', this.handler);
			},
			/**
			 * @method add
			 */
			add : function(route, enter, exit) {
				this.routes[route] = {
					route : route,
					enter : enter,
					exit : exit,
					regex : new RegExp(route.replace(/\//g, "\\/").replace(/:(\w*)/g, "(\\w*)"))
				};
			},
			/**
			 * @method remove
			 */
			remove : function(route) {
				delete this.routes[route];
			},
			/**
			 * @method watchMethod
			 */
			watchMethod : function(scope, name, prefix, callback) {
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
			/**
			 * @method go
			 */
			go : function() {

			}
		}
	});
});