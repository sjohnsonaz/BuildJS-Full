/**
 * @class build.widget.authentication.LoginForm
 * @extends build.form.Form
 */
Build('build.widget.authentication.LoginForm', [ 'build::build.form.Form', 'build::build.ui.Content', 'build::build.form.input.Text', 'build::build.form.input.Password', 'build::build.form.input.Submit', 'build::build.form.container.FormControl',
		'build::build.form.Label', 'build::build.binding.TextBinding', 'build::build.widget.authentication.LoginViewModel' ], function(define, $super) {
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
			var viewModel = new build.widget.authentication.LoginViewModel();
			$super(this)({
				username : {},
				password : {}
			}, viewModel);
			this.method = 'POST';
			this.action = '#';

			this.message = build.ui.Content.create();
			this.username = build.form.input.Text.create();
			this.username.placeholder = 'Username';
			this.password = build.form.input.Password.create();
			this.password.placeholder = 'Password';
			this.submit = build.form.input.Submit.create('{i:[sign-in]} Login');
			this.authenticationServiceConnection = authenticationServiceConnection;

			build.binding.TextBinding.create(this.message, {
				sources : [ {
					source : viewModel,
					property : 'message'
				}, ]
			});

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
			login : function(success, error) {
				this.authenticationServiceConnection.login(this.viewModel.username, this.viewModel.password, function(data, request) {
					console.log(data);
					if (data.success) {
						this.runCallbacks('loginSuccess', data, request);
						Build.safe(success)(data, request);
					} else {
						this.viewModel.message = data.message;
						console.log('not logged in');
					}
				}.bind(this), function(request) {
					Build.safe(error)(data, request);
				}.bind(this));
			}
		}
	});
});