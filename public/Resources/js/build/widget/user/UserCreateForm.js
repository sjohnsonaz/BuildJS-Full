/**
 * @class build.widget.user.UserCreateForm
 * @extends build.form.Form
 */
Build('build.widget.user.UserCreateForm', [ 'build::build.form.Form', 'build::build.ui.element.Div', 'build::build.form.input.Text', 'build::build.form.input.Password', 'build::build.form.input.Button', 'build::build.form.input.Submit',
		'build::build.form.container.ButtonGroup', 'build::build.form.container.FormControl', 'build::build.form.Label' ], function($define, $super) {
	$define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 * @param userServiceConnection
		 */
		/**
		 * @property userServiceConnection
		 * @property message
		 * @property username
		 * @property firstName
		 * @property lastName
		 * @property password
		 * @property cancel
		 * @property submit
		 */
		$constructor : function UserCreateForm(userServiceConnection) {
			$super(this)();
			this.method = 'POST';
			this.action = '#';

			this.userServiceConnection = userServiceConnection;

			this.message = build.ui.element.Div.create();
			this.addChild(this.message);

			this.username = build.form.input.Text.create();
			this.username.placeholder = 'Username';
			this.addChild(build.form.container.FormControl.create(build.form.Label.create('Username'), this.username));

			this.firstName = build.form.input.Text.create();
			this.firstName.placeholder = 'First Name';
			this.addChild(build.form.container.FormControl.create(build.form.Label.create('First Name'), this.firstName));

			this.lastName = build.form.input.Text.create();
			this.lastName.placeholder = 'Last Name';
			this.addChild(build.form.container.FormControl.create(build.form.Label.create('Last Name'), this.lastName));

			this.password = build.form.input.Text.create();
			this.password.placeholder = 'Password';
			this.addChild(build.form.container.FormControl.create(build.form.Label.create('Password'), this.password));

			this.cancel = build.form.input.Button.create('Cancel');
			this.submit = build.form.input.Submit.create('Save');
			var buttonGroup = build.form.container.ButtonGroup.create();
			buttonGroup.addChild(this.cancel);
			buttonGroup.addChild(this.submit);
			this.addChild(buttonGroup);

			this.preventSubmit();
			this.submit.addEventListener('click', function(submit, event) {
				event.preventDefault();
				this.saveUser();
				return false;
			}, false, this);
			this.cancel.addEventListener('click', function(cancel, event) {
				event.preventDefault();
				this.cancelUser();
				return false;
			}, false, this);
		},
		$prototype : {
			/**
			 * 
			 */
			wrap : function(model) {
				this.username.value = model.username;
				this.firstName.value = model.firstName;
				this.lastName.value = model.lastName;
				this.password.value = model.password;
			},
			/**
			 * 
			 */
			unwrap : function(model) {
				model.username = this.username.value;
				model.firstName = this.firstName.value;
				model.lastName = this.lastName.value;
				model.password = this.password.value;
			},
			/**
			 * 
			 */
			clear : function() {
				this.message.text = '';
				this.username.text = '';
				this.firstName.text = '';
				this.lastName.text = '';
				this.password.text = '';
			},
			/**
			 * 
			 */
			saveUser : function(success, error) {
				// Change to PUT if editing, POST if creating.
				this.userServiceConnection.post(this.model, function(data, request) {
					console.log(data);
					if (data.error) {
						this.message.text(data.message);
						console.log(data.message);
					} else {
						Build.safe(success)(data, request);
						this.runCallbacks('saveUser', data);
					}
				}.bind(this), function(request) {
					Build.safe(error)(request);
				}.bind(this));
			},
			/**
			 * 
			 */
			cancelUser : function() {
				this.runCallbacks('cancelUser');
			}
		}
	});
});