var compressor = require('node-minify');
new compressor.minify({
	type : 'gcc',
	language : 'ECMASCRIPT5',
	fileIn : 'public/Resources/js/build/Build.js',
	fileOut : 'public/Resources/min/js/Build.min.js',
	callback : function(err, min) {
		console.log('Minification complete.');
		// console.log('Error: ' + err);
		// console.log(min);
	}
});