var compressor = require('node-minify');

//var config = require('./config');
var Build = require('./public/Resources/js/build/Build');
Build.environment.globalOverride();

var application = __dirname + '/public/DemoResources/js/demo/application/DemoApplication.js'
var root = __dirname + '/public';
var lazy = true;

var files = Build.bundle(root, application, lazy);

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