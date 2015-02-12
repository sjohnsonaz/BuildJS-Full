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
		$constructor : function LogoutForm(authenticationServiceConnection) {
			$super(this)(authenticationServiceConnection);
			this.method = 'POST';
			this.action = '#';

			this.username = build.ui.element.Div.create('');
			this.submit = build.form.input.Submit.create('{i:[sign-out]} Logout');
			this.authenticationServiceConnection = authenticationServiceConnection;

			this.addChild(this.username);
			this.addChild(build.form.container.FormControl.create(null, this.submit));

			this.addEvent('submit', function(form, event) {
				event.preventDefault();
				this.logout();
				return false;
			}, false, this);
		},
		$prototype : {
			/**
			 * 
			 */
			wrap : function(model) {
				this.username.text = 'Logged in as ' + model.username;
			},
			/**
			 * 
			 */
			unwrap : function(model) {

			},
			/**
			 * 
			 */
			clear : function() {
				this.username.text = '';
			},
			/**
			 * 
			 */
			logout : function(success, error) {
				this.authenticationServiceConnection.logout(function(data, request) {
					console.log(data);
					this.runCallbacks('logoutSuccess', data, request);
					Build.safe(success)(data, request);
				}.bind(this), function(request) {
					Build.safe(error)(request);
				}.bind(this));
			}
		}
	});
});