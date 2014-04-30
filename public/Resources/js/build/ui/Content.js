/**
 * @class build.ui.Content
 * @extends build.ui.Widget
 */
Build('build.ui.Content', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Content() {
			$super(this)();
		}
	});
});