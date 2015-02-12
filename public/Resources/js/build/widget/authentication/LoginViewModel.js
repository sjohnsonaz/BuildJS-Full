/**
 * @class build.widget.authentication.LoginViewModel
 * @extends build.mvvm.ViewModel
 */
Build('build.widget.authentication.LoginViewModel', [ 'build::build.mvvm.ViewModel' ], function($define, $super) {
	$define({
		$extends : 'build.mvvm.ViewModel',
		/**
		 * @constructor
		 */
		$constructor : function LoginViewModel(data, serviceConnection) {
			$super(this)({
				username : {},
				password : {},
				message : {}
			}, data);
			this.serviceConnection = serviceConnection;
		},
		$prototype : {
			login : function(success, error) {
				this.serviceConnection.login(this.username, this.password, function(data, request) {
					console.log(data);
					if (data.success) {
						this.runCallbacks('loginSuccess', data, request);
						Build.safe(success)(data, request);
					} else {
						this.message = data.message;
						console.log('not logged in');
					}
				}.bind(this), function(request) {
					Build.safe(error)(data, request);
				}.bind(this));
			}
		}
	});
});