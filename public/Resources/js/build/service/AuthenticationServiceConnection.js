/**
 * @class build.service.AuthenticationServiceConnection
 * @extends build.service.ServiceConnection
 */
Build('build.service.AuthenticationServiceConnection', [ 'build::build.service.ServiceConnection' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.service.ServiceConnection',
		/**
		 * @constructor
		 */
		$constructor : function AuthenticationServiceConnection(base) {
			$super(this)(base || '/api/authentication');
			/**
			 * @method login
			 * @param username
			 * @param password
			 * @param success
			 * @param error
			 */
			this.addRoute({
				name : 'login',
				url : '/login',
				verb : 'POST',
				action : function(username, password, success, error) {
					return {
						data : {
							username : username,
							password : password
						}
					};
				}
			});
			/**
			 * @method logout
			 * @param success
			 * @param error
			 */
			this.addRoute({
				name : 'logout',
				url : '/logout',
				verb : 'POST',
				action : function(success, error) {
				}
			});
			/**
			 * @method user
			 * @param success
			 * @param error
			 */
			this.addRoute({
				name : 'user',
				url : '/user',
				verb : 'GET',
				action : function(success, error) {
				}
			});
		}
	});
});