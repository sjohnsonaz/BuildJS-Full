Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.inheritance.Application', [ 'build::build.ui.Application', 'build::build.ui.form.Form', 'build::build.ui.form.Button', 'build::build.ui.form.Header1', 'build::build.ui.tab.TabContainer', 'build::build.ui.tab.TabPanel', 'demo::demo.ui.form.TestForm' ], function(define, $super) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function() {
			$super(this)();

			// Add title
			var title = build.ui.form.Header1.create('BuildJS');
			this.addChild(title);

			var tabContainer = build.ui.tab.TabContainer.create();
			var tabPanel0 = build.ui.tab.TabPanel.create();
			var tabPanel1 = build.ui.tab.TabPanel.create();
			tabContainer.addChild(tabPanel0);
			tabContainer.addChild(tabPanel1);
			this.addChild(tabContainer);

			// Add form and button
			var form = build.ui.form.Form.create();
			var button = build.ui.form.Button.create('Button 1');
			form.addChild(button);
			this.addChild(form);

			// Add testForm
			var testForm = demo.ui.form.TestForm.create();
			this.addChild(testForm);

			// Add routes
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
	application = demo.inheritance.Application.create();
	ko.applyBindingsToNode(document.body, {
		element : application
	});
	// Build.load([], function() {});
});