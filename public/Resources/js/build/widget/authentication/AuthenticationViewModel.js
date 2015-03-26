/**
 * @class build.widget.authentication.LoginViewModel
 * @extends build.mvvm.ViewModel
 */
Build('build.widget.authentication.AuthenticationViewModel', [ 'build::build.mvvm.ViewModel' ], function($define, $super) {
	$define({
		$extends : 'build.mvvm.ViewModel',
		/**
		 * @constructor
		 */
		$constructor : function AuthenticationViewModel(data, serviceConnection) {
			$super(this)({
				loggedIn : {},
				username : {},
				password : {},
				message : {},
				user : {}
			}, data);
			this.serviceConnection = serviceConnection;
		},
		$prototype : {
			/**
			 * 
			 */
			login : function(success, error) {
				var self = this;
				this.serviceConnection.login(this.username, this.password, function(data, request, event) {
					console.log(data);
					if (data.success) {
						self.loggedIn = true;
						self.user = data.user;
						self.message = '';
						Build.safe(success)(data, request);
					} else {
						self.loggedIn = false;
						self.user = undefined;
						self.message = data.message;
						console.log('not logged in');
						Build.safe(error)(data, request);
					}
				}, function(request) {
					Build.safe(error)(data, request);
				});
			},
			/**
			 * 
			 */
			logout : function(success, error) {
				var self = this;
				this.serviceConnection.logout(function(data, request) {
					console.log(data);
					self.loggedIn = false;
					self.user = undefined;
					self.message = data.message;
					Build.safe(success)(data, request);
				}, function(request) {
					Build.safe(error)(request);
				});
			},
			/**
			 * @method getUser
			 * @param success
			 * @param error
			 */
			getUser : function(success, error) {
				var self = this;
				this.serviceConnection.user(function(data, request) {
					if (data.user) {
						self.loggedIn = true;
						self.user = data.user;
					} else {
						self.loggedIn = false;
						self.user = undefined;
					}
				}, error);
			}
		}
	});
});