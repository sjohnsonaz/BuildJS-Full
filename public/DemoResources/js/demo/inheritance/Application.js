Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.inheritance.Application', [ 'build::build.ui.Application', 'build::build.widget.menu.ExpandableMenuWidget', 'build::build.widget.menu.MenuElement', 'build::build.widget.menu.MenuTitle', 'build::build.ui.element.Div',
		'build::build.ui.tab.TabContainer', 'build::build.ui.tab.TabPanel', 'build::build.widget.authentication.AuthenticationWidget', 'demo::demo.ui.form.WidgetForm', 'demo::demo.ui.form.TestForm',
		'build::build.service.AuthenticationServiceConnection', 'demo::demo.service.TestServiceConnection' ], function(define, $super) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function Application() {
			$super(this)();
			this.user = undefined;

			var menu = build.widget.menu.ExpandableMenuWidget.create();
			menu.addClass('menu-fixed-top');
			// Add title
			var title = build.widget.menu.MenuTitle.create('BuildJS');
			menu.addChild(title);
			var menuElement0 = build.widget.menu.MenuElement.create();
			menuElement0.text = 'My Link 0';
			menuElement0.url = 'test.html';
			menu.addChild(menuElement0);
			var menuElement1 = build.widget.menu.MenuElement.create();
			menuElement1.text = 'My Link 1';
			menuElement1.url = 'test.html';
			menu.addChild(menuElement1);
			this.addChild(menu);

			this.authenticationServiceConnection = new build.service.AuthenticationServiceConnection();
			this.authenticationWidget = build.widget.authentication.AuthenticationWidget.create(this.authenticationServiceConnection);
			this.authenticationWidget.addClass('pull-right');
			menu.addChild(this.authenticationWidget);
			this.authenticationWidget.addCallback('loginSuccess', function(data, request) {
				this.user = data.user;
				// this.addChild(this.userWidget);
			}.bind(this));
			this.authenticationWidget.addCallback('logoutSuccess', function(data, request) {
				this.user = undefined;
				// this.removeChild(this.userWidget);
			}.bind(this));
			this.authenticationWidget.run();

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
				widgetForm.model = data;
			});

			// Add testForm
			var testForm = demo.ui.form.TestForm.create();
			tabPanel1.addChild(testForm);

			// Add routes
			this.router.add('#/test/:id', function(id) {
				console.log('test started: ' + id);
			});
			this.router.watchMethod(tabContainer, 'openTabIndex', 'tab', tabContainer.openTabIndex);
			this.router.listen();
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.watchClass('menuFixedTop', 'application-menu-fixed-top');
				this.menuFixedTop = true;
			}
		}
	});
});

Build(function() {
	console.log('Application started...');
	application = demo.inheritance.Application.create();
	application.run(document.body);
});