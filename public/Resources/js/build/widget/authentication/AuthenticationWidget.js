/**
 * @class build.widget.authentication.AuthenticationWidget
 * @extends build.ui.Switcher
 */
Build('build.widget.authentication.AuthenticationWidget', [ 'build::build.ui.Switcher', 'build::build.widget.authentication.LoginForm', 'build::build.widget.authentication.LoginViewModel', 'build::build.widget.authentication.LogoutForm' ], function(
		$define, $super) {
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
			this.loginViewModel = new build.widget.authentication.LoginViewModel(undefined, authenticationServiceConnection);
			this.loginForm = build.widget.authentication.LoginForm.create(this.loginViewModel);
			this.logoutForm = build.widget.authentication.LogoutForm.create(authenticationServiceConnection);
			this.addChild(this.loginForm);
			this.addChild(this.logoutForm);
			this.authenticationServiceConnection = authenticationServiceConnection;
			/**
			 * @method getUser
			 * @param success
			 * @param error
			 */
			this.getUser = function(success, error) {
				self.authenticationServiceConnection.user(function(data, request) {
					if (data.user) {
						self.logoutForm.model = data.user;
						self.loginForm.model = null;
						self.active = 1;
						self.runCallbacks('loginSuccess', data, request);
					}
				}, error);
			};
			/**
			 * @method run
			 */
			this.run = function() {
				this.getUser();
			};
			/**
			 * @event loginSuccess
			 */
			this.loginViewModel.addCallback('loginSuccess', function(data, request) {
				self.logoutForm.model = data.user;
				self.loginForm.model = null;
				self.active = 1;
				self.runCallbacks('loginSuccess', data, request);
			});
			/**
			 * @event logoutSuccess
			 */
			this.logoutForm.addCallback('logoutSuccess', function(data, request) {
				self.loginForm.model = null;
				self.active = 0;
				self.logoutForm.model = null;
				self.runCallbacks('logoutSuccess', data, request);
			});
		}
	});
});