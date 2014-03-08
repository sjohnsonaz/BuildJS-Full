Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.inheritance.Application', [ 'build::build.ui.Application', 'build::build.ui.form.Header1', 'build::build.ui.tab.TabContainer', 'build::build.ui.tab.TabPanel', 'build::build.ui.authentication.LoginForm', 'demo::demo.ui.form.WidgetForm',
		'demo::demo.ui.form.TestForm', 'demo::demo.service.TestServiceConnection' ], function(define, $super) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function() {
			$super(this)();

			// Add title
			var title = build.ui.form.Header1.create('BuildJS');
			this.addChild(title);

			var loginForm = build.ui.authentication.LoginForm.create();
			this.addChild(loginForm);

			// Add tab container
			var tabContainer = build.ui.tab.TabContainer.create();
			var tabPanel0 = build.ui.tab.TabPanel.create('Widget Form');
			var tabPanel1 = build.ui.tab.TabPanel.create('Template Form');
			tabContainer.addChild(tabPanel0);
			tabContainer.addChild(tabPanel1);
			this.addChild(tabContainer);

			// Add form and button
			var widgetForm = demo.ui.form.WidgetForm.create();
			tabPanel0.addChild(widgetForm);
			var testServiceConnection = new demo.service.TestServiceConnection();
			testServiceConnection.getRest(function(data, request) {
				widgetForm.model(data);
			});

			// Add testForm
			var testForm = demo.ui.form.TestForm.create();
			tabPanel1.addChild(testForm);

			// Add routes
			this.router.add('#/test/:id', function(id) {
				console.log('test started: ' + id);
			});
			this.router.watch(tabContainer, 'openTabIndex', 'tab', tabContainer.openTabIndex);
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