module.exports = function(Build) {
	Build('build.mvc.model.MongooseSchema', [ 'buildnode::build.mvc.model.Schema' ], function(define, $super) {
		define({
			$extends : 'build.mvc.model.Schema',
			$constructor : function() {
				$super(this)();
				this.schema = null;
			},
		});
	});
};