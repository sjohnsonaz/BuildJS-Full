module.exports = {
	files : [ {
		algorithm : 'gcc',
		source : [ '/public/Resources/js/build/Build.js' ],
		destination : 'public/Resources/min/js/Build.min.js',
		include : [ '.js' ],
		exclude : []
	}, {
		algorithm : 'gcc',
		source : [ /* '/public/Resources/js/build/Build.js', */'/public/Resources/js' ],
		destination : 'public/Resources/min/js/Build-browser.min.js',
		include : [ '.js' ],
		exclude : []
	}, {
		algorithm : 'gcc',
		source : [ '/public/Resources/js/build/Build.js', '/public/NodeResources/js' ],
		destination : 'public/Resources/min/js/Build-node.min.js',
		include : [ '.js' ],
		exclude : []
	}, {
		algorithm : 'gcc',
		source : [ /* '/public/Resources/js/build/Build.js', */'/public/Resources/js', '/public/NodeResources/js' ],
		destination : 'public/Resources/min/js/Build-all.min.js',
		include : [ '.js' ],
		exclude : []
	} ]
};