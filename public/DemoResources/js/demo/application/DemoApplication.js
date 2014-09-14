Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

Build('demo.application.DemoApplication', [ 'build::build.ui.application.AdminApplication', 'build::build.widget.menu.ExpandableMenuWidget', 'build::build.widget.menu.MenuElement', 'build::build.widget.menu.MenuTitle', 'build::build.ui.element.Div',
		'build::build.widget.tab.TabContainer', 'build::build.widget.tab.TabPanel', 'build::build.widget.authentication.AuthenticationWidget', 'demo::demo.ui.form.WidgetForm', 'demo::demo.ui.form.ViewModelPanel', 'demo::demo.ui.form.RemotePanel',
		'demo::demo.ui.form.YouTubePanel', 'build::build.service.AuthenticationServiceConnection', 'demo::demo.service.TestServiceConnection' ], function(define, $super) {
	define({
		$extends : 'build.ui.application.AdminApplication',
		$constructor : function Application() {
			$super(this)();

			// Add title
			this.title = 'BuildJS';

			var lastMenuItem = this.menu.children[this.menu.children.length - 1];

			var menuElement0 = build.widget.menu.MenuElement.create();
			menuElement0.text = 'My Link 0';
			menuElement0.url = 'test.html';
			this.menu.addChild(menuElement0, lastMenuItem);
			var menuElement1 = build.widget.menu.MenuElement.create();
			menuElement1.text = 'My Link 1';
			menuElement1.url = 'test.html';
			this.menu.addChild(menuElement1, lastMenuItem);

			// Add tab container
			var tabContainer = build.widget.tab.TabContainer.create();
			var tabPanel0 = build.widget.tab.TabPanel.create('Widget Form');
			var tabPanel1 = build.widget.tab.TabPanel.create('View Model Form');
			var tabPanel2 = build.widget.tab.TabPanel.create('Remote Panel');
			var tabPanel3 = build.widget.tab.TabPanel.create('YouTube Panel');
			tabContainer.addChild(tabPanel0);
			tabContainer.addChild(tabPanel1);
			tabContainer.addChild(tabPanel2);
			tabContainer.addChild(tabPanel3);
			this.homePanel.addChild(tabContainer);

			// Add form and button
			var widgetForm = demo.ui.form.WidgetForm.create();
			tabPanel0.addChild(widgetForm);
			var testServiceConnection = new demo.service.TestServiceConnection();
			testServiceConnection.getRest(function(data, request) {
				widgetForm.model = data;
			});

			var viewModelPanel = demo.ui.form.ViewModelPanel.create();
			tabPanel1.addChild(viewModelPanel);

			var remotePanel = demo.ui.form.RemotePanel.create();
			tabPanel2.addChild(remotePanel);

			var youTubePanel = demo.ui.form.YouTubePanel.create();
			tabPanel3.addChild(youTubePanel);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});

Build(function() {
	console.log('Application started...');
	application = demo.application.DemoApplication.create();
	application.run(document.body);
});