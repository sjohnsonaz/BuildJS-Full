Build('build.widget.authentication.LogoutForm', [ 'build::build.ui.form.Form', 'build::build.ui.element.Div', 'build::build.ui.form.Submit', 'build::build.ui.form.FormControl', 'build::build.ui.form.Label' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function LogoutForm(authenticationServiceConnection) {
			$super(this)(authenticationServiceConnection);
			this.username = build.ui.element.Div.create('');
			this.submit = build.ui.form.Submit.create('{{i:sign-out}} Logout');
			this.authenticationServiceConnection = authenticationServiceConnection;

			this.addChild(this.username);
			this.addChild(build.ui.form.FormControl.create(null, this.submit));
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.method = 'POST';
				this.action = '#';
				this.addEvent('submit', function(form, event) {
					event.preventDefault();
					this.logout();
					return false;
				}, false, this);
			},
			wrap : function(model) {
				this.username.text = 'Logged in as ' + model.username;
			},
			unwrap : function(model) {

			},
			clear : function() {
				this.username.text = '';
			},
			logout : function(success, error) {
				this.authenticationServiceConnection.logout(function(data, request) {
					console.log(data);
					this.runCallbacks('logoutSuccess', data, request);
					safe(success)(data, request);
				}.bind(this), function(request) {
					safe(error)(request);
				}.bind(this));
			}
		}
	});
});