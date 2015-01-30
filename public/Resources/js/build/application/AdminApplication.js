/**
 * @class build.application.AdminApplication
 * @extends build.application.AuthenticatedApplication
 */
Build('build.application.AdminApplication', [ 'build::build.application.AuthenticatedApplication', 'build::build.ui.Container', 'build::build.service.UserServiceConnection', 'build::build.widget.tab.TabPanel', 'build::build.widget.tab.TabContainer',
		'build::build.widget.user.UserWidget' ], function(define, $super) {
	define({
		$extends : 'build.application.AuthenticatedApplication',
		/**
		 * @constructor
		 */
		$constructor : function AdminApplication() {
			$super(this)();
			this.homePanel = build.ui.Container.create();
			this.sections.addChild(this.homePanel);
			this.homeMenuElement = build.widget.menu.MenuElement.create();
			this.homeMenuElement.text = 'Home';
			this.homeMenuElement.url = 'home';
			this.homeMenuElement.action = function(MenuElement, event) {
				this.section(MenuElement.pathname.replace('/', ''));
			}.bind(this);

			this.userSeriveConnection = new build.service.UserServiceConnection();
			this.adminPanel = build.widget.tab.TabContainer.create();

			this.adminUserTab = build.widget.tab.TabPanel.create('Users');
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
				this.section(MenuElement.pathname.replace('/', ''));
			}.bind(this);
			this.menu.children.unshift(this.adminMenuElement);
			this.menu.children.unshift(this.homeMenuElement);
		}
	});
});