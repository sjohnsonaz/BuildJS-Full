module.exports = function(Build) {
	Build('build.mvc.IsLoggedInPermission', [], function(define, $super) {
		define({
			$constructor : function IsLoggedInPermission() {
				this.run = function(request, response) {
					return !!request.session.user;
				};
			}
		});
	});
};