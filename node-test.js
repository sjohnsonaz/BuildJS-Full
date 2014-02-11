var Build = require('./public/Resources/js/build/Build');
Build.environment.globalOverride();
Build.paths.main = __dirname + '/public/Resources/js/';
Build.paths.demo = __dirname + '/public/DemoResources/js/';
Build.paths.node = __dirname + '/public/NodeResources/js/';
Build(function() {
	Build.load('node::build.NodeTest', function() {
		var test = build.NodeTest();
	});
});

/*var child = require('./node-child');
child(function(name, value) {
	process[name] = value;
	console.log('parent says: ' + process[name]);
});*/