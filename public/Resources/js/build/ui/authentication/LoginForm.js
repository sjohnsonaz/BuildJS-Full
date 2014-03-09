Build('build.ui.authentication.LoginForm', [ 'build::build.ui.form.Form', 'build::build.ui.form.Div', 'build::build.ui.form.Text', 'build::build.ui.form.Password', 'build::build.ui.form.Submit', 'build::build.ui.form.FormControl',
		'build::build.ui.form.Label' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function(authenticationServiceConnection, parent) {
			$super(this)();
			this.method('POST');
			this.action('#');
			this.message = build.ui.form.Div.create();
			this.username = build.ui.form.Text.create();
			this.username.placeholder('Username');
			this.password = build.ui.form.Password.create();
			this.password.placeholder('Password');
			this.submit = build.ui.form.Submit.create('Login');
			this.authenticationServiceConnection = authenticationServiceConnection;
			this.parent = parent;

			this.addChild(this.message);
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Username'), this.username));
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Password'), this.password));
			this.addChild(this.submit);
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				this.addEvent('submit', function(form, event) {
					event.preventDefault();
					this.login();
					return false;
				}, false, this);
			},
			wrap : function(model) {
				this.username.text(model.username);
				this.password.text(model.password);
			},
			unwrap : function(model) {
				// model.username = this.username.text();
				// model.password = this.password.text();
			},
			clear : function() {
				this.message.text('');
				this.username.text('');
				this.password.text('');
			},
			login : function(success, error) {
				this.authenticationServiceConnection.login(this.username.text(), this.password.text(), function(data, request) {
					console.log(data);
					if (data.success) {
						safe(this.parent.loginSuccess)(data, request);
						safe(success)(data, request);
					} else {
						this.message.text(data.message);
						console.log('not logged in');
					}
				}.bind(this), function(request) {
					safe(error)(data, request);
				}.bind(this));
			}
		}
	});
});