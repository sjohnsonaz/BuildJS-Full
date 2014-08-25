/**
 * @class build.widget.authentication.LoginForm
 * @extends build.ui.form.Form
 */
Build('build.widget.authentication.LoginForm', [ 'build::build.ui.form.Form', 'build::build.ui.element.Div', 'build::build.ui.form.Text', 'build::build.ui.form.Password', 'build::build.ui.form.Submit', 'build::build.ui.form.FormControl',
		'build::build.ui.form.Label' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Form',
		/**
		 * @constructor
		 * @params authenticationServiceConnection
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
			this.message = build.ui.element.Div.create();
			this.username = build.ui.form.Text.create();
			this.username.placeholder = 'Username';
			this.password = build.ui.form.Password.create();
			this.password.placeholder = 'Password';
			this.submit = build.ui.form.Submit.create('{{i:sign-in}} Login');
			this.submit.textHelpers = true;
			this.authenticationServiceConnection = authenticationServiceConnection;

			this.addChild(this.message);
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Username', this.username), this.username));
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Password', this.password), this.password));
			this.addChild(build.ui.form.FormControl.create(null, this.submit));
		},
		$prototype : {
			/**
			 * 
			 */
			init : function() {
				$super().init(this)();
				this.method = 'POST';
				this.action = '#';

				this.addEvent('submit', function(form, event) {
					event.preventDefault();
					// Force update for saved passwords.
					// this.username.text = this.username.element.value;
					// this.password.text = this.password.element.value;
					this.login();
					return false;
				}, false, this);
			},
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