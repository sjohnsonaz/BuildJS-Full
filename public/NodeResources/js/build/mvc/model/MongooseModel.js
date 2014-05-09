module.exports = function(Build) {
	Build('build.mvc.model.MongooseModel', [ 'buildnode::build.mvc.model.Model' ], function(define, $super) {
		define({
			$extends : 'build.mvc.model.Model',
			$constructor : function MongooseModel() {
				$super(this)();
				this.schema = null;
				this.model = null;
			},
		});
	});
};