/**
 * @class build.application.AuthenticatedApplication
 * @extends build.application.Application
 */
Build('build.application.AuthenticatedApplication', [ 'build::build.application.Application', 'build::build.ui.Switcher', 'build::build.widget.menu.ExpandableMenuTop', 'build::build.widget.menu.MenuElement',
		'build::build.widget.authentication.AuthenticationWidget', 'build::build.service.AuthenticationServiceConnection' ], function($define, $super) {
	$define({
		$extends : 'build.application.Application',
		/**
		 * @constructor
		 */
		$constructor : function AuthenticatedApplication() {
			$super(this)();
			var self = this;

			this.user = null;
			this.menu = build.widget.menu.ExpandableMenuTop.create();
			this.menu.addClass('menu-fixed-top');
			this.menu.openElement = function(element, event) {
				event.preventDefault;
				console.log('open element: ' + element.url);
			};
			this.addChild(this.menu);

			this.authenticationServiceConnection = new build.service.AuthenticationServiceConnection();
			this.authenticationWidget = build.widget.authentication.AuthenticationWidget.create(this.authenticationServiceConnection);
			this.authenticationWidget.addClass('pull-right');
			this.menu.addChild(this.authenticationWidget);
			this.authenticationWidget.addCallback('loginSuccess', function(data, request) {
				self.user = data.user;
				// this.addChild(this.userWidget);
			});
			this.authenticationWidget.addCallback('logoutSuccess', function(data, request) {
				self.user = undefined;
				// this.removeChild(this.userWidget);
			});

			Object.defineProperty(this, 'title', {
				get : function() {
					return this.menu.title.text;
				},
				set : function(value) {
					this.menu.title.text = value;
					this.publish('title');
				}
			});

			this.sections = build.ui.Switcher.create();
			this.sections.lockable = true;
			this.addChild(this.sections);

			// Add routes
			// this.router.add('#/test/:id', function(id) {
			// console.log('test started: ' + id);
			// });
			this.watchClass('menuFixedTop', 'application-menu-fixed-top', true);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.authenticationWidget.run();
				this.router.watchMethod(this, 'section', 'section', function(sectionName) {
					console.log('open section: ' + sectionName);
					switch (sectionName) {
					case 'home':
						this.sections.active = 0;
						break;
					case 'admin':
						this.sections.active = 1;
						break;
					default:
						var address = parseInt(sectionName);
						if (!isNaN(address)) {
							this.sections.active = address;
						}
						break;
					}
				});
				this.router.defaultRoute(this, function() {
					this.sections.active = 0;
				});
				this.router.listen();
			}
		},
		$static : {
			deferClassName : true
		}
	});
});