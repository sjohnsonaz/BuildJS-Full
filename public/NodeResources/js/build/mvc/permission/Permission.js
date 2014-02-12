module.exports = function(Build) {
	Build('build.mvc.Permission', [], function(define, $super) {
		define({
			$constructor : function() {
				this.run = function(request, response) {
					return true;
				};
			}
		});
	});
};