module.exports = function(Build) {
	/**
	 * @class build.mvc.model.MongooseSchema
	 * @extends build.mvc.model.Schema
	 */
	Build('build.mvc.model.MongooseSchema', [ 'buildnode::build.mvc.model.Schema' ], function($define, $super) {
		$define({
			$extends : 'build.mvc.model.Schema',
			/**
			 * @constructor
			 */
			$constructor : function MongooseSchema() {
				$super(this)();
				this.schema = null;
			},
		});
	});
};