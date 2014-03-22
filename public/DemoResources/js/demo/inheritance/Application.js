Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.inheritance.Application', [ 'build::build.ui.Application', 'build::build.ui.form.Header1', 'build::build.ui.tab.TabContainer', 'build::build.ui.tab.TabPanel', 'build::build.widget.authentication.AuthenticationWidget',
		'demo::demo.ui.form.WidgetForm', 'demo::demo.ui.form.TestForm', 'build::build.service.AuthenticationServiceConnection', 'demo::demo.service.TestServiceConnection' ], function(define, $super) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function() {
			$super(this)();
			this.user = undefined;

			// Add title
			var title = build.ui.form.Header1.create('BuildJS');
			this.addChild(title);

			this.authenticationServiceConnection = new build.service.AuthenticationServiceConnection();
			this.authenticationWidget = build.widget.authentication.AuthenticationWidget.create(this.authenticationServiceConnection);
			this.addChild(this.authenticationWidget);
			this.authenticationWidget.addCallback('loginSuccess', function(data, request) {
				this.user = data.user;
				this.addChild(this.userWidget);
			}.bind(this));
			this.authenticationWidget.addCallback('logoutSuccess', function(data, request) {
				this.user = undefined;
				this.removeChild(this.userWidget);
			}.bind(this));
			this.authenticationWidget.init();

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