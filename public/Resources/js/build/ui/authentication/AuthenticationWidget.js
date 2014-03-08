Build('build.ui.authentication.AuthenticationWidget', [ 'build::build.ui.SwitcherPanel', 'build::build.ui.authentication.LoginForm', 'build::build.ui.authentication.LogoutForm' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		$constructor : function(authenticationServiceConnection) {
			$super(this)();
			this.loginForm = build.ui.authentication.LoginForm.create(authenticationServiceConnection, this);
			this.logoutForm = build.ui.authentication.LogoutForm.create(authenticationServiceConnection, this);
			this.addChild(this.loginForm);
			this.addChild(this.logoutForm);
			this.loginSuccess = function(data, request) {
				this.logoutForm.model(data.user);
				this.active(1);
				this.loginForm.model(null);
			}.bind(this);
			this.logoutSuccess = function(data, request) {
				this.loginForm.model(null);
				this.active(0);
				this.logoutForm.model(null);
			}.bind(this);
		}
	});
});