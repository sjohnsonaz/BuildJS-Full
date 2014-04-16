module.exports = function(Build) {
	Build('build.mvc.IsLoggedInPermission', [], function(define, $super, helper) {
		define({
			$constructor : function() {
				this.run = function(request, response) {
					return !!request.session.user;
				};
			}
		});
	});
};