/**
 * @class build.widget.menu.MenuTop
 * @extends build.ui.Container
 */
Build('build.widget.menu.MenuTop', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function MenuTop() {
			$super(this)();
		},
		$prototype : {
			type : 'ul'
		}
	});
});