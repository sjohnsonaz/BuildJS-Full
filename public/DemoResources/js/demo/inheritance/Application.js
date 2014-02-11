Build.paths.main = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';
Build(function() {
	console.log('Application started...');
	Build.load([ 'build.ui.form.Button', 'demo::demo.ui.TestModule' ], function() {
		var button = new build.ui.form.Button();
		var testModule = new demo.ui.TestModule();
		button.createElement();
		document.body.appendChild(button.element);
	});
});