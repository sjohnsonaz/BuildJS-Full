/**
 * @class build.widget.toggle.SlideToggle
 * @extends build.ui.Widget
 */
Build('build.widget.toggle.SlideToggle', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function SlideToggle() {
			$super(this)();
		}
	});
});