Build.paths.main = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';
Build(function() {
	console.log('Application started...');
	Build.load([ 'build.ui.Module', 'demo::demo.ui.TestModule' ], function() {
		var module = new build.ui.Module();
		var testModule = new demo.ui.TestModule();
	});
});