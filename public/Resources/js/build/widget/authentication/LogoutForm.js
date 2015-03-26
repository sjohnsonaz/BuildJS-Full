/**
 * @class build.widget.authentication.LogoutForm
 * @extends build.form.Form
 */
Build('build.widget.authentication.LogoutForm', [ 'build::build.form.Form', 'build::build.ui.element.Div', 'build::build.form.input.Submit', 'build::build.form.container.FormControl', 'build::build.form.Label' ], function($define, $super) {
	$define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 * @param authenticationServiceConnection
		 */
		/**
		 * @property username
		 * @property submit
		 * @property authenticationServiceConnection
		 */
		$constructor : function LogoutForm(viewModel) {
			$super(this)();
			this.method = 'POST';
			this.action = '#';

			this.viewModel = viewModel;

			this.username = build.ui.element.Div.create('');
			this.submit = build.form.input.Submit.create('{i:[sign-out]} Logout');

			this.bind({
				username : [ {
					handler : 'oneWay',
					property : 'rawText',
					sources : [ {
						source : viewModel,
						property : 'username'
					} ]
				} ]
			});

			this.addEventListener('submit', function(form, event) {
				event.preventDefault();
				this.logout();
				return false;
			}, false, this);

			this.addChild(this.username);
			this.addChild(build.form.container.FormControl.create(null, this.submit));
		},
		$prototype : {
			logout : function() {
				this.viewModel.logout();
			},
			clear : function() {
				this.viewModel.userName = undefined;
			}
		}
	});
});