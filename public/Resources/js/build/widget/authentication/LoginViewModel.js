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
				var self = this;
				this.serviceConnection.login(this.username, this.password, function(data, request, event) {
					console.log(data);
					if (data.success) {
						self.runCallbacks('loginSuccess', data, request);
						Build.safe(success)(data, request);
					} else {
						self.message = data.message;
						console.log('not logged in');
					}
				}, function(request) {
					Build.safe(error)(data, request);
				});
			}
		}
	});
});