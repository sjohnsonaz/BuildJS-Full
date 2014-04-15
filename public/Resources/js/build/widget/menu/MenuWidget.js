/**
 * @class build.widget.menu.MenuWidget
 * @extends build.ui.Widget
 */
Build('build.widget.menu.MenuWidget', [ 'build::build.ui.Widget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 * @property directAppend
		 */
		$constructor : function MenuWidget() {
			$super(this)();
			this.type = 'ul';
			this.directAppend = true;
		}
	});
});