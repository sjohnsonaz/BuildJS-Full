Build('build.ui.application.AuthenticatedApplication', [ 'build::build.ui.Application', 'build::build.widget.menu.ExpandableMenuWidget', 'build::build.widget.authentication.AuthenticationWidget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function AuthenticatedApplication() {
			$super(this)();
			this.user = null;
			this.menu = build.widget.menu.ExpandableMenuWidget.create();
			this.menu.addClass('menu-fixed-top');
			this.addChild(this.menu);

			this.authenticationServiceConnection = new build.service.AuthenticationServiceConnection();
			this.authenticationWidget = build.widget.authentication.AuthenticationWidget.create(this.authenticationServiceConnection);
			this.authenticationWidget.addClass('pull-right');
			this.menu.addChild(this.authenticationWidget);
			this.authenticationWidget.addCallback('loginSuccess', function(data, request) {
				this.user = data.user;
				// this.addChild(this.userWidget);
			}.bind(this));
			this.authenticationWidget.addCallback('logoutSuccess', function(data, request) {
				this.user = undefined;
				// this.removeChild(this.userWidget);
			}.bind(this));
			this.authenticationWidget.run();

			Object.defineProperty(this, 'title', {
				get : function() {
					return this.menu.title.text;
				},
				set : function(value) {
					this.menu.title.text = value;
					this.publish('title');
				}
			});
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