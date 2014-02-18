Build.paths.main = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.inheritance.Application', [ 'build.ui.Application', 'build.ui.form.Form', 'build.ui.form.Button', 'demo::demo.ui.form.TestForm' ], function(define, $super) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function() {
			$super(this)();

			// var form = new build.ui.form.Form();
			// var button = new build.ui.form.Button();
			// form.addChild(button);
			var form = new demo.ui.form.TestForm();
			this.addChild(form);
			this.router.add('#/test/:id', function() {
				console.log('test started');
			});
			this.router.listen();
		}
	});
});

Build(function() {
	console.log('Application started...');
	application = new demo.inheritance.Application();
	document.body.appendChild(application.element);
	// Build.load([], function() {});
});