module.exports = function(Build) {
	Build('build.mvc.model.MongooseModel', [ 'buildnode::build.mvc.model.Model' ], function(define, $super, helper) {
		define({
			$extends : 'build.mvc.model.Model',
			$constructor : function() {
				$super(this)();
				this.schema = null;
				this.model = null;
			},
		});
	});
};