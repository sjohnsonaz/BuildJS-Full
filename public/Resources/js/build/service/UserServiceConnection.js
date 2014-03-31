Build('build.service.UserServiceConnection', [ 'build::build.service.ServiceConnection' ], function(define, $super, merge) {
	define({
		$extends : 'build.service.ServiceConnection',
		$constructor : function UserServiceConnection(base) {
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
					return {
						data : user
					};
				}
			});
			this.addRoute({
				name : 'put',
				verb : 'PUT',
				action : function(_id, user, success, error) {
					return {
						query : {
							id : _id
						},
						data : user
					};
				}
			});

		}
	});
});