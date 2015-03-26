/**
 * @class build.widget.authentication.AuthenticationWidget
 * @extends build.ui.Switcher
 */
Build('build.widget.authentication.AuthenticationWidget', [ 'build::build.ui.Switcher', 'build::build.widget.authentication.LoginForm', 'build::build.widget.authentication.AuthenticationViewModel', 'build::build.widget.authentication.LogoutForm' ],
		function($define, $super) {
			$define({
				$extends : 'build.ui.Switcher',
				/**
				 * @constructor
				 * @param authenticationServiceConnection
				 */
				/**
				 * @property loginForm
				 * @property logoutForm
				 */
				$constructor : function AuthenticationWidget(authenticationServiceConnection) {
					$super(this)();
					var self = this;
					this.authenticationViewModel = new build.widget.authentication.AuthenticationViewModel(undefined, authenticationServiceConnection);
					this.loginForm = build.widget.authentication.LoginForm.create(this.authenticationViewModel);
					this.logoutForm = build.widget.authentication.LogoutForm.create(this.authenticationViewModel);
					this.addChild(this.loginForm);
					this.addChild(this.logoutForm);
					this.authenticationServiceConnection = authenticationServiceConnection;
					this.bind([ {
						handler : 'oneWay',
						property : 'active',
						sources : [ {
							source : this.authenticationViewModel,
							property : 'loggedIn'
						} ],
						output : function(loggedIn) {
							return loggedIn ? 1 : 0;
						}
					} ]);
					/**
					 * @method getUser
					 * @param success
					 * @param error
					 */
					this.getUser = function(success, error) {
						self.authenticationViewModel.getUser(success, error);
					};
					/**
					 * @method run
					 */
					this.run = function() {
						this.getUser();
					};
				}
			});
		});