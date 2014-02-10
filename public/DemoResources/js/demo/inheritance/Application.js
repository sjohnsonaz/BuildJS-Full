Build.paths.main = '/Resources/js/';
Build(function() {
	console.log('Application started...');
	Build.load([ 'build.ui.Module' ], function() {
		var module = new build.ui.Module();
	});
});