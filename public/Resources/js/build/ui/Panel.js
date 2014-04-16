/**
 * @class build.ui.Panel
 * @extends build.ui.Widget
 */
Build('build.ui.Panel', [ 'build::build.ui.Widget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Panel() {
			$super(this)();
		}
	});
});