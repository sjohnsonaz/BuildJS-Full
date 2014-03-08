Build('build.service.AuthenticationServiceConnection', [ 'build::build.service.ServiceConnection' ], function(define, $super, merge) {
	define({
		$extends : 'build.service.ServiceConnection',
		$constructor : function(base) {
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
		}
	});
});