var fs = require('fs');
var compressor = require('node-minify');
var config = require('./config-minify');

function getDestination(folder, name, version, specialization, suffix) {
	return folder + '/' + name + (version ? ('-' + version) : '') + (specialization ? ('.' + specialization) : '') + '.min.' + suffix;
}

function zeroFillString(number) {
	if (number < 10) {
		return '0' + number;
	} else {
		return '' + number;
	}
}

var date = null;
var timestamp = null;
function getTimestamp() {
	date = date || new Date();
	timestamp = timestamp || (zeroFillString(date.getDate()) + '-' + zeroFillString(date.getMonth() + 1) + '-' + date.getFullYear());
	return timestamp;
}

config = config({
	getDestination : getDestination,
	getTimestamp : getTimestamp
});

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

function arrayMerge(array0, array1) {
	for ( var index = 0, length = array1.length; index < length; index++) {
		array0.push(array1[index]);
	}
	return array0;
}

function addFile(path, extensionsIncluded, extensionsExcluded) {
	var files = [];
	var stat = fs.statSync(path);
	if (stat.isFile()) {
		files.push(path);
	} else if (stat.isDirectory()) {
		var contents = fs.readdirSync(path);
		for ( var index = 0, length = contents.length; index < length; index++) {
			arrayMerge(files, addFile(path + '/' + contents[index], extensionsIncluded, extensionsExcluded));
		}
	}
	return files;
}

function minifyDirectory(algorithm, source, destination, include, exclude) {
	console.log('Minifying ' + __dirname + source);
	var files = [];
	for ( var index = 0, length = source.length; index < length; index++) {
		arrayMerge(files, addFile(__dirname + source[index], include, exclude));
	}
	console.log(files);

	new compressor.minify({
		type : algorithm,
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
		minifyDirectory(file.algorithm, file.source, file.destination, file.include, file.exclude);
	}
}

run(files);