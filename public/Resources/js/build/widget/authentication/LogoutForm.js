Build('build.widget.authentication.LogoutForm', [ 'build::build.ui.form.Form', 'build::build.ui.form.Div', 'build::build.ui.form.Submit', 'build::build.ui.form.FormControl', 'build::build.ui.form.Label' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function(authenticationServiceConnection) {
			$super(this)(authenticationServiceConnection);
			this.method('POST');
			this.action('#');
			this.username = build.ui.form.Div.create('');
			this.submit = build.ui.form.Submit.create('Logout');
			this.authenticationServiceConnection = authenticationServiceConnection;

			this.addChild(this.username);
			this.addChild(this.submit);
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				this.addEvent('submit', function() {
					event.preventDefault();
					this.logout();
					return false;
				}, false, this);
			},
			wrap : function(model) {
				this.username.text('Logged in as ' + model.username);
			},
			unwrap : function(model) {

			},
			clear : function() {
				this.username.text('');
			},
			logout : function(success, error) {
				this.authenticationServiceConnection.logout(function(data, request) {
					console.log(data);
					this.runCallbacks('logoutSuccess', data, request);
					safe(success)(data, request);
				}.bind(this), function(request) {
					safe(error)(data, request);
				}.bind(this));
			}
		}
	});
});