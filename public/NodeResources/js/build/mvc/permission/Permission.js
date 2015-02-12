module.exports = function(Build) {
	/**
	 * @class build.mvc.Permission
	 */
	Build('build.mvc.Permission', [], function($define, $super) {
		$define({
			/**
			 * @constructor
			 */
			$constructor : function Permission() {
				this.run = function(request, response) {
					return true;
				};
			}
		});
	});
};