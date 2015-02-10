module.exports = function(Build) {
	/**
	 * @class build.mvc.model.MongooseModel
	 * @extends build.mvc.model.Model
	 */
	Build('build.mvc.model.MongooseModel', [ 'buildnode::build.mvc.model.Model' ], function(define, $super) {
		define({
			$extends : 'build.mvc.model.Model',
			/**
			 * @constructor
			 */
			$constructor : function MongooseModel() {
				$super(this)();
				this.schema = null;
				this.model = null;
			},
		});
	});
};