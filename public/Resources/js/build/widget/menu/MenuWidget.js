/**
 * @class build.widget.menu.MenuWidget
 * @extends build.ui.Container
 */
Build('build.widget.menu.MenuWidget', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function MenuWidget() {
			$super(this)();
		},
		$prototype : {
			type : 'ul'
		}
	});
});