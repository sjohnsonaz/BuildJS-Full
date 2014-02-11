Build.paths.main = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.inheritance.Application', [ 'build.ui.Application', 'build.ui.form.Form', 'build.ui.form.Button', 'demo::demo.ui.TestModule' ], function(define, $super) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function() {
			$super(this)();

			var form = new build.ui.form.Form();
			var button = new build.ui.form.Button();
			form.addChild(button);
			this.addChild(form);
			// var testModule = new demo.ui.TestModule();
		}
	});
});

Build(function() {
	console.log('Application started...');
	application = new demo.inheritance.Application();
	document.body.appendChild(application.element);
	// Build.load([], function() {});
});