/**
 * @class build.widget.user.UserEditForm
 * @extends build.form.Form
 */
Build('build.widget.user.UserEditForm', [ 'build::build.form.Form', 'build::build.ui.element.Div', 'build::build.form.Text', 'build::build.form.Password', 'build::build.form.Button', 'build::build.form.Submit',
		'build::build.form.ButtonGroup', 'build::build.form.FormControl', 'build::build.form.Label' ], function(define, $super) {
	define({
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
		$constructor : function UserEditForm(userServiceConnection) {
			$super(this)();
			this.method = 'POST';
			this.action = '#';

			this.userServiceConnection = userServiceConnection;

			this.message = build.ui.element.Div.create();
			this.addChild(this.message);

			this.username = build.form.Text.create();
			this.username.placeholder = 'Username';
			this.addChild(build.form.FormControl.create(build.form.Label.create('Username'), this.username));

			this.firstName = build.form.Text.create();
			this.firstName.placeholder = 'First Name';
			this.addChild(build.form.FormControl.create(build.form.Label.create('First Name'), this.firstName));

			this.lastName = build.form.Text.create();
			this.lastName.placeholder = 'Last Name';
			this.addChild(build.form.FormControl.create(build.form.Label.create('Last Name'), this.lastName));

			this.password = build.form.Text.create();
			this.password.placeholder = 'Password';
			this.addChild(build.form.FormControl.create(build.form.Label.create('Password'), this.password));

			this.cancel = build.form.Button.create('Cancel');
			this.submit = build.form.Submit.create('Save');
			var buttonGroup = build.form.ButtonGroup.create();
			buttonGroup.addChild(this.cancel);
			buttonGroup.addChild(this.submit);
			this.addChild(buttonGroup);

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
				this.userServiceConnection.put(this.model._id, this.model, function(data, request) {
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