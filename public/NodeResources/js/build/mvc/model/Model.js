module.exports = function(Build) {
	Build('build.mvc.model.Model', [], function(define, $super) {
		define({
			$constructor : function Model() {
			},
		});
	});
};