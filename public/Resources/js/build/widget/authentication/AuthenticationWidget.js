/**
 * @class build.widget.authentication.AuthenticationWidget
 * @extends build.ui.SwitcherPanel
 */
Build('build.widget.authentication.AuthenticationWidget', [ 'build::build.ui.SwitcherPanel', 'build::build.widget.authentication.LoginForm', 'build::build.widget.authentication.LogoutForm' ], function(define, $super) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		/**
		 * @constructor
		 * @param authenticationServiceConnection
		 */
		/**
		 * @property loginForm
		 * @property logoutForm
		 */
		$constructor : function AuthenticationWidget(authenticationServiceConnection) {
			$super(this)();
			this.loginForm = build.widget.authentication.LoginForm.create(authenticationServiceConnection);
			this.logoutForm = build.widget.authentication.LogoutForm.create(authenticationServiceConnection);
			this.addChild(this.loginForm);
			this.addChild(this.logoutForm);
			this.authenticationServiceConnection = authenticationServiceConnection;
			/**
			 * @method getUser
			 * @param success
			 * @param error
			 */
			this.getUser = function(success, error) {
				this.authenticationServiceConnection.user(function(data, request) {
					if (data.user) {
						this.logoutForm.model = data.user;
						this.loginForm.model = null;
						this.active = 1;
						this.runCallbacks('loginSuccess', data, request);
					}
				}.bind(this), error);
			};
			/**
			 * @method run
			 */
			this.run = function() {
				this.getUser();
			};
			/**
			 * @event loginSuccess
			 */
			this.loginForm.addCallback('loginSuccess', function(data, request) {
				this.logoutForm.model = data.user;
				this.loginForm.model = null;
				this.active = 1;
				this.runCallbacks('loginSuccess', data, request);
			}.bind(this));
			/**
			 * @event logoutSuccess
			 */
			this.logoutForm.addCallback('logoutSuccess', function(data, request) {
				this.loginForm.model = null;
				this.active = 0;
				this.logoutForm.model = null;
				this.runCallbacks('logoutSuccess', data, request);
			}.bind(this));
		},
		$prototype : {
			/**
			 * @method init
			 */
			init : function() {
				$super().init(this)();
			}
		}
	});
});