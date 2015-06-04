/**
 * @class build.widget.popup.Popup
 * @extends build.ui.Widget
 */
Build('build.widget.popup.Popup', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Popup() {
			$super(this)();
		}
	});
});