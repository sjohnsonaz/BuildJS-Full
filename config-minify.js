module.exports = {
	files : [ {
		algorithm : 'gcc',
		source : [ '/public/Resources/js' ],
		destination : 'public/Resources/min/js/Build-all.min.js',
		include : [ '.js' ],
		exclude : []
	}, {
		algorithm : 'gcc',
		source : [ '/public/Resources/js/build/Build.js' ],
		destination : 'public/Resources/min/js/Build.min.js',
		include : [ '.js' ],
		exclude : []
	} ]
};