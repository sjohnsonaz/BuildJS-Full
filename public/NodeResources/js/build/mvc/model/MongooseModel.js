module.exports = function(Build) {
	Build('build.mvc.model.MongooseModel', [ 'build.mvc.model.Model' ], function(define, $super) {
		define({
			$extends : 'build.mvc.model.Model',
			$constructor : function() {
				$super(this)();
			},
		});
	});
};