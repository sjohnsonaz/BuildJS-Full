var config = require('./config');
var Build = require('./public/Resources/js/build/Build');
Build.environment.globalOverride();
Build.paths.main = __dirname + '/public/Resources/js/';
Build.paths.demo = __dirname + '/public/DemoResources/js/';
Build.paths.node = __dirname + '/public/NodeResources/js/';
Build(function() {
	Build.load('node::build.mvc.server.DynamicServer', function() {
		var server = new build.mvc.server.DynamicServer(config);
		server.start();
	});
});
