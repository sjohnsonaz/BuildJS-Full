module.exports = function(Build) {
	/**
	 * @class build.mvc.IsLoggedInPermission
	 */
	Build('build.mvc.IsLoggedInPermission', [], function(define, $super) {
		define({
			/**
			 * @constructor
			 */
			$constructor : function IsLoggedInPermission() {
				this.run = function(request, response) {
					return !!request.session.user;
				};
			}
		});
	});
};