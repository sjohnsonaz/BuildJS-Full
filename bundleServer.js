var compressor = require('node-minify');

var config = require('./config-bundle');
var Build = require('./public/Resources/js/build/Build');
Build.environment.globalOverride();

var files = Build.bundle(config.root, config.application, config.lazy);

if (config.prependBuild) {
	files.unshift(__dirname + '/public/Resources/js/build/Build.js');
	files.unshift(__dirname + '/public/Resources/polyfill/Legacy.polyfill.js');
}

console.log(files);

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
	}
});

function getDestination(folder, name, version, specialization, suffix) {
	return folder + '/' + name + (version ? ('-' + version) : '') + (specialization ? ('.' + specialization) : '') + '.min.' + suffix;
}