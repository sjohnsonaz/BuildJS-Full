Build('build.ui.application.AdminApplication', [ 'build::build.ui.application.AuthenticatedApplication', 'build::build.ui.Panel', 'build::build.service.UserServiceConnection', 'build::build.ui.tab.TabPanel', 'build::build.ui.tab.TabContainer',
		'build::build.widget.user.UserWidget' ], function(define, $super) {
	define({
		$extends : 'build.ui.application.AuthenticatedApplication',
		$constructor : function AdminApplication() {
			$super(this)();
			this.homePanel = build.ui.Panel.create();
			this.sections.addChild(this.homePanel);
			this.homeMenuElement = build.widget.menu.MenuElement.create();
			this.homeMenuElement.text = 'Home';
			this.homeMenuElement.url = 'home';
			this.homeMenuElement.action = function(MenuElement, event) {
				this.sections.active = 0;// ('admin');
			}.bind(this);
			this.menu.addChild(this.homeMenuElement);

			this.userSeriveConnection = new build.service.UserServiceConnection();
			this.adminPanel = build.ui.tab.TabContainer.create();

			this.adminUserTab = build.ui.tab.TabPanel.create('Users');
			this.userWidget = build.widget.user.UserWidget.create(this.userServiceConnection);
			this.adminUserTab.addChild(this.userWidget);
			this.adminPanel.addChild(this.adminUserTab);

			this.authenticationWidget.addCallback('loginSuccess', function(data, request) {
				// this.user = data.user;
				// this.addChild(this.adminPanel);
				this.userWidget.list();
			}.bind(this));
			this.authenticationWidget.addCallback('logoutSuccess', function(data, request) {
				// this.user = undefined;
				// this.removeChild(this.adminPanel);
			}.bind(this));
			this.sections.addChild(this.adminPanel);

			this.adminMenuElement = build.widget.menu.MenuElement.create();
			this.adminMenuElement.text = 'Admin';
			this.adminMenuElement.url = 'admin';
			this.adminMenuElement.action = function(MenuElement, event) {
				this.sections.active = 1;// ('admin');
			}.bind(this);
			this.menu.addChild(this.adminMenuElement);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});