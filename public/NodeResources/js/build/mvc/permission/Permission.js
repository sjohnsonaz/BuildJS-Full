module.exports = function(Build) {
	Build('build.mvc.Permission', [], function(define, $super) {
		define({
			$constructor : function Permission() {
				this.run = function(request, response) {
					return true;
				};
			}
		});
	});
};