Build.paths.main = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';
Build(function() {
	console.log('Application started...');
	Build.load([ 'build.ui.Widget', 'demo::demo.ui.TestModule' ], function() {
		var widget = new build.ui.Widget();
		var testModule = new demo.ui.TestModule();
		document.body.appendChild(widget.element);
	});
});