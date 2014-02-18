Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.inheritance.Application', [ 'build::build.ui.Application', 'build::build.ui.form.Form', 'build::build.ui.form.Button', 'demo::demo.ui.form.TestForm' ], function(define, $super) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function() {
			$super(this)();

			// var form = new build.ui.form.Form();
			// var button = new build.ui.form.Button();
			// form.addChild(button);
			var form = new demo.ui.form.TestForm();
			this.addChild(form);
			this.router.add('#/test/:id', function(id) {
				console.log('test started: ' + id);
			});
			this.router.watch(this, 'openTab', 'tab', function(id) {
				console.log('tab started: ' + id);
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