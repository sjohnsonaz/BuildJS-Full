Build('build.widget.user.UserCreateForm', [ 'build::build.ui.form.Form', 'build::build.ui.element.Div', 'build::build.ui.form.Text', 'build::build.ui.form.Password', 'build::build.ui.form.Button', 'build::build.ui.form.Submit',
		'build::build.ui.form.ButtonGroup', 'build::build.ui.form.FormControl', 'build::build.ui.form.Label' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function UserCreateForm(userServiceConnection) {
			$super(this)();
			this.userServiceConnection = userServiceConnection;

			this.message = build.ui.element.Div.create();
			this.addChild(this.message);

			this.username = build.ui.form.Text.create();
			this.username.placeholder = 'Username';
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Username'), this.username));

			this.firstName = build.ui.form.Text.create();
			this.firstName.placeholder = 'First Name';
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('First Name'), this.firstName));

			this.lastName = build.ui.form.Text.create();
			this.lastName.placeholder = 'Last Name';
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Last Name'), this.lastName));

			this.password = build.ui.form.Text.create();
			this.password.placeholder = 'Password';
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Password'), this.password));

			this.cancel = build.ui.form.Button.create('Cancel');
			this.submit = build.ui.form.Submit.create('Save');
			var buttonGroup = build.ui.form.ButtonGroup.create();
			buttonGroup.addChild(this.cancel);
			buttonGroup.addChild(this.submit);
			this.addChild(buttonGroup);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.method = 'POST';
				this.action = '#';

				this.preventSubmit();
				this.submit.addEvent('click', function(submit, event) {
					event.preventDefault();
					this.saveUser();
					return false;
				}, false, this);
				this.cancel.addEvent('click', function(cancel, event) {
					event.preventDefault();
					this.cancelUser();
					return false;
				}, false, this);
			},
			wrap : function(model) {
				this.username.value = model.username;
				this.firstName.value = model.firstName;
				this.lastName.value = model.lastName;
				this.password.value = model.password;
			},
			unwrap : function(model) {
				model.username = this.username.value;
				model.firstName = this.firstName.value;
				model.lastName = this.lastName.value;
				model.password = this.password.value;
			},
			clear : function() {
				this.message.text = '';
				this.username.text = '';
				this.firstName.text = '';
				this.lastName.text = '';
				this.password.text = '';
			},
			saveUser : function(success, error) {
				// Change to PUT if editing, POST if creating.
				this.userServiceConnection.post(this.model._id, this.model, function(data, request) {
					console.log(data);
					if (data.error) {
						this.message.text(data.message);
						console.log(data.message);
					} else {
						safe(success)(data, request);
						this.runCallbacks('saveUser', data);
					}
				}.bind(this), function(request) {
					safe(error)(request);
				}.bind(this));
			},
			cancelUser : function() {
				this.runCallbacks('cancelUser');
			}
		}
	});
});