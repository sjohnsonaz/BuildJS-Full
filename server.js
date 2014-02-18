var config = require('./config');
var Build = require('./public/Resources/js/build/Build');
Build.environment.globalOverride();
Build.paths.main = config.Build.backend.paths.main;
Build.paths.demo = config.Build.backend.paths.demo;
Build.paths.buildnode = config.Build.backend.paths.buildnode;
Build(function() {
	Build.load([ 'buildnode::build.mvc.server.DynamicServer', 'buildnode::build.mvc.controller.UserController', 'buildnode::build.mvc.controller.TestController' ], function() {
		var server = new build.mvc.server.DynamicServer(config);
		server.addController(new build.mvc.controller.TestController(server.app));
		server.addController(new build.mvc.controller.UserController(server.app));
		server.start();
	});
});
