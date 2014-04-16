module.exports = function(Build) {
	Build('build.mvc.Permission', [], function(define, $super, helper) {
		define({
			$constructor : function() {
				this.run = function(request, response) {
					return true;
				};
			}
		});
	});
};