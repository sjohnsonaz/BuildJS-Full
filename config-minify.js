var minFolders = {
	js : 'public/min/js',
	css : 'public/min/css',
	less : 'public/min/less',
	html : 'public/min/html'
};
var timestamp = null;//min.getTimestamp()
module.exports = function(min) {
	return {
		files : [ {
			algorithm : 'gcc',
			source : [ '/public/Resources/js/build/Build.js' ],
			destination : min.getDestination(minFolders.js, 'Build', timestamp, null, 'js'),
			include : [ '.js' ],
			exclude : []
		}, {
			algorithm : 'gcc',
			source : [ /* '/public/Resources/js/build/Build.js', */'/public/Resources/js' ],
			destination : min.getDestination(minFolders.js, 'Build', timestamp, 'browser', 'js'),
			include : [ '.js' ],
			exclude : []
		}, {
			algorithm : 'gcc',
			source : [ '/public/Resources/js/build/Build.js', '/public/NodeResources/js' ],
			destination : min.getDestination(minFolders.js, 'Build', timestamp, 'node', 'js'),
			include : [ '.js' ],
			exclude : []
		}, {
			algorithm : 'gcc',
			source : [ /* '/public/Resources/js/build/Build.js', */'/public/Resources/js', '/public/NodeResources/js' ],
			destination : min.getDestination(minFolders.js, 'Build', timestamp, 'all', 'js'),
			include : [ '.js' ],
			exclude : []
		}, {
			algorithm : 'yui-css',
			source : [ '/public/Resources/css/base.css' ],
			destination : min.getDestination(minFolders.css, 'Build', timestamp, null, 'css'),
			include : [ '.css' ],
			exclude : []
		} ]
	};
};