/**
 * @class build.ui.Container
 * @extends build.ui.Widget
 */
Build('build.ui.Container', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Container() {
			$super(this)();
		}
	});
});