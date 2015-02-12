/**
 * @class build.widget.menu.MenuTitle
 * @extends build.widget.menu.MenuText
 */
Build('build.widget.menu.MenuTitle', [ 'build::build.widget.menu.MenuText' ], function($define, $super) {
	$define({
		$extends : 'build.widget.menu.MenuText',
		/**
		 * @constructor
		 * @param text
		 */
		$constructor : function MenuTitle(text) {
			$super(this)(text);
		}
	});
});