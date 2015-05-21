//var config = require('./config');
var Build = require('./public/Resources/js/build/Build');
Build.environment.globalOverride();

if (typeof window === 'undefined') {
	window = {};
	document = {};
}

Build.bundleMode = true;
Build.bundleModeRoot = __dirname + '/public';

require('./public/DemoResources/js/demo/application/DemoApplication');
console.log(Build.loadedFiles.sort());