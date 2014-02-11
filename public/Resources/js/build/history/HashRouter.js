Build('build.HashRouter', [], function(define, $super) {
	define({
		$constructor : function() {
			this.routes = {};
		},
		$prototype : {
			handler : function(event) {
				for ( var route in routes) {
					if (routes.hasOwnProperty(route)) {
						var routeDef = routes[route];
						var params = event.newURL.match(routeDef.regex);
						if (params) {
							routeDef.enter.apply(routeDef.enter, params.slice(1));
						}
					}
				}
			},
			listen : function() {
				window.addEventHandler('hashchange', this.handler);
			},
			stop : function() {
				window.removeEventHandler('hashchange', this.handler);
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
			}
		}
	});
});