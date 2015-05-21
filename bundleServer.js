var compressor = require('node-minify');

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
var files = Build.loadedFiles.sort();
console.log(files);

function getDestination(folder, name, version, specialization, suffix) {
	return folder + '/' + name + (version ? ('-' + version) : '') + (specialization ? ('.' + specialization) : '') + '.min.' + suffix;
}

new compressor.minify({
	type : 'uglifyjs',
	language : 'ECMASCRIPT5',
	fileIn : files,
	fileOut : getDestination('public/min/js', 'DemoFull', null, null, 'js'),
	callback : function(err, min) {
		console.log('Minification complete.');
		if (err) {
			console.log('Error: ' + err);
		}
		// console.log(min);
	}
});