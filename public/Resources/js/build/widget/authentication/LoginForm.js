/**
 * @class build.widget.authentication.LoginForm
 * @extends build.form.Form
 */
Build('build.widget.authentication.LoginForm', [ 'build::build.form.Form', 'build::build.ui.Content', 'build::build.form.input.Text', 'build::build.form.input.Password', 'build::build.form.input.Submit', 'build::build.form.container.FormControl',
		'build::build.form.Label', 'build::build.binding.OneWayBinding' ], function($define, $super) {
	$define({
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
		$constructor : function LoginForm(viewModel) {
			$super(this)();
			this.method = 'POST';
			this.action = '#';
			this.viewModel = viewModel;

			this.message = build.ui.Content.create();
			this.username = build.form.input.Text.create();
			this.username.placeholder = 'Username';
			this.password = build.form.input.Password.create();
			this.password.placeholder = 'Password';
			this.submit = build.form.input.Submit.create('{i:[sign-in]} Login');

			this.bind({
				username : [ {
					handler : 'value',
					source : viewModel,
					sourceProperty : 'username'
				} ],
				password : [ {
					handler : 'value',
					source : viewModel,
					sourceProperty : 'password',
				} ],
				message : [ {
					handler : 'oneWay',
					property : 'rawText',
					sources : [ {
						source : viewModel,
						property : 'message'
					} ]
				} ]
			});

			this.addChild(this.message);
			this.addChild(build.form.container.FormControl.create(build.form.Label.create('Username', this.username), this.username));
			this.addChild(build.form.container.FormControl.create(build.form.Label.create('Password', this.password), this.password));
			this.addChild(build.form.container.FormControl.create(null, this.submit));

			this.addEventListener('submit', function(form, event) {
				event.preventDefault();
				// Force update for saved passwords.
				// this.username.text = this.username.element.value;
				// this.password.text = this.password.element.value;
				this.viewModel.login();
				return false;
			}, false, this);
		}
	});
});