//var config = require('./config');
var Build = require('./public/Resources/js/build/Build');
Build.environment.globalOverride();

if (typeof window === 'undefined') {
	window = {};
	document = {};
}

Build.paths.main = __dirname + '/public/Resources/js/';
Build.paths.build = __dirname + '/public/Resources/js/';
Build.paths.demo = __dirname + '/public/DemoResources/js/';

Build(function() {
	Build.load([ 'demo::demo.application.DemoApplication' ], function() {
		console.log('Application loaded');
		console.log(Build.loadedFiles.sort());
	});
}, true);