Build('build.service.AuthenticationServiceConnection', [ 'build::build.service.ServiceConnection' ], function(define, $super, merge) {
	define({
		$extends : 'build.service.ServiceConnection',
		$constructor : function AuthenticationServiceConnection(base) {
			$super(this)(base || '/api/authentication');
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
			this.addRoute({
				name : 'logout',
				url : '/logout',
				verb : 'POST',
				action : function(success, error) {
				}
			});
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