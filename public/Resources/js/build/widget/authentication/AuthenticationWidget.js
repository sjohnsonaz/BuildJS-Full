Build('build.widget.authentication.AuthenticationWidget', [ 'build::build.ui.SwitcherPanel', 'build::build.widget.authentication.LoginForm', 'build::build.widget.authentication.LogoutForm' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		$constructor : function(authenticationServiceConnection) {
			$super(this)();
			this.loginForm = build.widget.authentication.LoginForm.create(authenticationServiceConnection, this);
			this.logoutForm = build.widget.authentication.LogoutForm.create(authenticationServiceConnection, this);
			this.addChild(this.loginForm);
			this.addChild(this.logoutForm);
			this.loginSuccess = function(data, request) {
				this.logoutForm.model(data.user);
				this.loginForm.model(null);
				this.active(1);
			}.bind(this);
			this.logoutSuccess = function(data, request) {
				this.loginForm.model(null);
				this.active(0);
				this.logoutForm.model(null);
			}.bind(this);
		}
	});
});