Build('build.widget.user.UserEditForm', [ 'build::build.ui.form.Form', 'build::build.ui.form.Div', 'build::build.ui.form.Text', 'build::build.ui.form.Password', 'build::build.ui.form.Button', 'build::build.ui.form.Submit', 'build::build.ui.form.FormControl',
		'build::build.ui.form.Label' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function(userServiceConnection) {
			$super(this)();
			this.method('POST');
			this.action('#');
			this.message = build.ui.form.Div.create();
			this.username = build.ui.form.Text.create();
			this.username.placeholder('Username');
			this.cancel = build.ui.form.Button.create('Cancel');
			this.submit = build.ui.form.Submit.create('Save');
			this.userServiceConnection = userServiceConnection;

			this.addChild(this.message);
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Username'), this.username));
			this.addChild(this.cancel);
			this.addChild(this.submit);
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				this.addEvent('submit', function(form, event) {
					event.preventDefault();
					// Force update for saved passwords.
					this.username.text(this.username.element.value);
					return false;
				}, false, this);
			},
			wrap : function(model) {
				this.username.text(model.username);
			},
			unwrap : function(model) {
				// model.username = this.username.text();
			},
			clear : function() {
				this.message.text('');
				this.username.text('');
			},
			login : function(success, error) {
				this.userServiceConnection.get(this.username.text(), this.password.text(), function(data, request) {
					console.log(data);
					if (data.success) {
						this.runCallbacks('loginSuccess', data, request);
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