Build('build.ui.application.AuthenticatedApplication', [ 'build::build.ui.Application', 'build::build.ui.SwitcherPanel', 'build::build.widget.menu.ExpandableMenuWidget', 'build::build.widget.menu.MenuElement',
		'build::build.widget.authentication.AuthenticationWidget', 'build::build.service.AuthenticationServiceConnection' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Application',
		$constructor : function AuthenticatedApplication() {
			$super(this)();

			this.user = null;
			this.menu = build.widget.menu.ExpandableMenuWidget.create();
			this.menu.addClass('menu-fixed-top');
			this.menu.openElement = function(element, event) {
				event.preventDefault;
				console.log('open element: ' + element.url);
			};
			this.router.watchMethod(this, 'section', 'section', function(sectionName) {
				console.log('open section: ' + sectionName);
				switch (sectionName) {
				case 'admin':
					this.sections.active = 0;
					break;
				}
			});
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

			Object.defineProperty(this, 'title', {
				get : function() {
					return this.menu.title.text;
				},
				set : function(value) {
					this.menu.title.text = value;
					this.publish('title');
				}
			});

			this.sections = build.ui.SwitcherPanel.create();
			this.addChild(this.sections);

			// Add routes
			// this.router.add('#/test/:id', function(id) {
			// console.log('test started: ' + id);
			// });
			this.router.listen();
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.watchClass('menuFixedTop', 'application-menu-fixed-top');
				this.menuFixedTop = true;
				this.authenticationWidget.run();
			}
		}
	});
});