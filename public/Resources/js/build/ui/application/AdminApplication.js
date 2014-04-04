Build('build.ui.application.AdminApplication', [ 'build::build.ui.application.AuthenticatedApplication', 'build::build.service.UserServiceConnection', 'build::build.ui.tab.TabPanel', 'build::build.ui.tab.TabContainer',
		'build::build.widget.user.UserWidget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.application.AuthenticatedApplication',
		$constructor : function AdminApplication() {
			$super(this)();
			this.userSeriveConnection = new build.service.UserServiceConnection();
			this.adminPanel = build.ui.tab.TabContainer.create();

			this.adminUserTab = build.ui.tab.TabPanel.create();
			this.userWidget = build.widget.user.UserWidget.create(this.userServiceConnection);
			this.adminUserTab.addChild(this.userWidget);
			this.adminPanel.addChild(this.adminUserTab);

			this.authenticationWidget.addCallback('loginSuccess', function(data, request) {
				// this.user = data.user;
				this.addChild(this.adminPanel);
				this.userWidget.list();
			}.bind(this));
			this.authenticationWidget.addCallback('logoutSuccess', function(data, request) {
				// this.user = undefined;
				this.removeChild(this.adminPanel);
			}.bind(this));
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});