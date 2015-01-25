/**
 * @class build.widget.authentication.LoginForm
 * @extends build.form.Form
 */
Build('build.widget.authentication.LoginForm', [ 'build::build.form.Form', 'build::build.ui.element.Div', 'build::build.form.input.Text', 'build::build.form.input.Password', 'build::build.form.input.Submit', 'build::build.form.container.FormControl',
		'build::build.form.Label' ], function(define, $super) {
	define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 * @param authenticationServiceConnection
		 */
		/**
		 * @property message
		 * @property username
		 * @property password
		 * @property submit
		 * @property authenticationServiceConnection
		 */
		$constructor : function LoginForm(authenticationServiceConnection) {
			$super(this)();
			this.method = 'POST';
			this.action = '#';

			this.message = build.ui.element.Div.create();
			this.username = build.form.input.Text.create();
			this.username.placeholder = 'Username';
			this.password = build.form.input.Password.create();
			this.password.placeholder = 'Password';
			this.submit = build.form.input.Submit.create('{i:[sign-in]} Login');
			this.authenticationServiceConnection = authenticationServiceConnection;

			this.addChild(this.message);
			this.addChild(build.form.container.FormControl.create(build.form.Label.create('Username', this.username), this.username));
			this.addChild(build.form.container.FormControl.create(build.form.Label.create('Password', this.password), this.password));
			this.addChild(build.form.container.FormControl.create(null, this.submit));

			this.addEvent('submit', function(form, event) {
				event.preventDefault();
				// Force update for saved passwords.
				// this.username.text = this.username.element.value;
				// this.password.text = this.password.element.value;
				this.login();
				return false;
			}, false, this);
		},
		$prototype : {
			/**
			 * 
			 */
			wrap : function(model) {
				this.username.text = model.username;
				this.password.text = model.password;
			},
			/**
			 * 
			 */
			unwrap : function(model) {
				// model.username = this.username.text();
				// model.password = this.password.text();
			},
			/**
			 * 
			 */
			clear : function() {
				this.message.text = '';
				this.username.text = '';
				this.password.text = '';
			},
			/**
			 * 
			 */
			login : function(success, error) {
				this.authenticationServiceConnection.login(this.username.value, this.password.value, function(data, request) {
					console.log(data);
					if (data.success) {
						this.runCallbacks('loginSuccess', data, request);
						Build.safe(success)(data, request);
					} else {
						this.message.text = data.message;
						console.log('not logged in');
					}
				}.bind(this), function(request) {
					Build.safe(error)(data, request);
				}.bind(this));
			}
		}
	});
});