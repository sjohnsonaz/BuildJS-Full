var fs = require('fs');
var compressor = require('node-minify');

var config = require('./config-minify');
var files = config.files;

if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

function extensionMatch(value, extensions) {
	var result = false;
	for ( var index = 0, length = extensions.length; index < length; index++) {
		var extension = extensions[index];
		if (value.endsWith(extension)) {
			result = true;
			break;
		}
	}
	return result;
}

function extensionNoMatch(value, extensions) {
	var result = true;
	for ( var index = 0, length = extensions.length; index < length; index++) {
		var extension = extensions[index];
		if (value.endsWith(extension)) {
			result = false;
			break;
		}
	}
	return result;
}

function getFiles(path, extensionsIncluded, extensionsExcluded) {
	var contents = fs.readdirSync(path);
	var files = [];
	for ( var index = 0, length = contents.length; index < length; index++) {
		var filename = path + '/' + contents[index];
		var stat = fs.statSync(filename);
		if (stat.isFile()) {
			if ((extensionsIncluded ? extensionMatch(filename, extensionsIncluded) : true) && (extensionsExcluded ? extensionNoMatch(filename, extensionsExcluded) : true)) {
				files.push(filename);
			}
		} else if (stat.isDirectory()) {
			var childFiles = getFiles(filename);
			for ( var childIndex = 0, childLength = childFiles.length; childIndex < childLength; childIndex++) {
				files.push(childFiles[childIndex]);
			}
		}
	}
	return files;
}

function minifyDirectory(source, destination, included, excluded) {
	console.log('Minifying ' + __dirname + source);
	var files = getFiles(__dirname + source, included, excluded);
	console.log(files);

	new compressor.minify({
		type : 'gcc',
		language : 'ECMASCRIPT5',
		fileIn : files,// 'public/Resources/js/build/Build.js',
		fileOut : destination,
		callback : function(err, min) {
			console.log('Minification complete.');
			if (err) {
				console.log('Error: ' + err);
			}
			// console.log(min);
		}
	});
}

function run(files) {
	for ( var index = 0, length = files.length; index < length; index++) {
		var file = files[index];
		minifyDirectory.apply(minifyDirectory, file);
	}
}

run(files);