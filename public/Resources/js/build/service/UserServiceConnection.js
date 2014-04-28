/**
 * @class build.service.UserServiceConnection
 * @extends build.service.ServiceConnection
 */
Build('build.service.UserServiceConnection', [ 'build::build.service.ServiceConnection' ], function(define, $super) {
	define({
		$extends : 'build.service.ServiceConnection',
		/**
		 * @constructor
		 * @param base
		 */
		$constructor : function UserServiceConnection(base) {
			$super(this)(base || '/api/user');
			/**
			 * @method get
			 * @param id
			 * @param success
			 * @param error
			 */
			this.addRoute({
				name : 'get',
				verb : 'GET',
				queryNames : [ 'id' ],
				action : function(id, success, error) {
				}
			});
			/**
			 * @method post
			 * @param user
			 * @param success
			 * @param error
			 */
			this.addRoute({
				name : 'post',
				verb : 'POST',
				action : function(user, success, error) {
					return {
						data : user
					};
				}
			});
			/**
			 * @method put
			 * @param _id
			 * @param user
			 * @param success
			 * @param error
			 */
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
			/**
			 * @method del
			 * @param _id
			 * @param success
			 * @param error
			 */
			this.addRoute({
				name : 'del',
				verb : 'DELETE',
				action : function(_id, success, error) {
					return {
						query : {
							id : _id
						}
					};
				}
			});
		}
	});
});