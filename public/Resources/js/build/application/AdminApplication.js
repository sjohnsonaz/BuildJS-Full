/**
 * @class build.application.AdminApplication
 * @extends build.application.AuthenticatedApplication
 */
Build('build.application.AdminApplication', [ 'build::build.application.AuthenticatedApplication', 'build::build.ui.Container', 'build::build.service.UserServiceConnection', 'build::build.widget.tab.TabPanel', 'build::build.widget.tab.TabContainer',
		'build::build.widget.user.UserWidget' ], function($define, $super) {
	$define({
		$extends : 'build.application.AuthenticatedApplication',
		/**
		 * @constructor
		 */
		$constructor : function AdminApplication() {
			$super(this)();
			var self = this;
			this.homePanel = build.ui.Container.create();
			this.sections.addChild(this.homePanel);
			this.homeMenuElement = build.widget.menu.MenuElement.create();
			this.homeMenuElement.text = 'Home';
			this.homeMenuElement.url = 'home';
			this.homeMenuElement.action = function(MenuElement, event) {
				self.section(MenuElement.pathname.replace('/', ''));
			};

			this.userSeriveConnection = new build.service.UserServiceConnection();
			this.adminPanel = build.widget.tab.TabContainer.create();

			this.adminUserTab = build.widget.tab.TabPanel.create('Users');
			this.userWidget = build.widget.user.UserWidget.create(this.userServiceConnection);
			this.adminUserTab.addChild(this.userWidget);
			this.adminPanel.addChild(this.adminUserTab);
			this.bind([ {
				handler : 'oneWay',
				sources : [ {
					source : this.authenticationWidget.authenticationViewModel,
					property : 'loggedIn'
				} ],
				output : function(loggedIn) {
					if (loggedIn) {
						self.userWidget.list();
					} else {

					}
				}
			} ]);

			this.sections.addChild(this.adminPanel);

			this.adminMenuElement = build.widget.menu.MenuElement.create();
			this.adminMenuElement.text = 'Admin';
			this.adminMenuElement.url = 'admin';
			this.adminMenuElement.action = function(MenuElement, event) {
				self.section(MenuElement.pathname.replace('/', ''));
			};
			this.menu.children.unshift(this.adminMenuElement);
			this.menu.children.unshift(this.homeMenuElement);
		}
	});
});