Build('build.service.UserServiceConnection', [ 'build::build.service.ServiceConnection' ], function(define, $super, merge) {
	define({
		$extends : 'build.service.ServiceConnection',
		$constructor : function(base) {
			$super(this)(base || '/api/user');
			this.addRoute({
				name : 'get',
				verb : 'GET',
				queryNames : [ 'id' ],
				action : function(id, success, error) {
				}
			});
			this.addRoute({
				name : 'post',
				verb : 'POST',
				action : function(user, success, error) {
					return user;
				}
			});
		}
	});
});