/**
 * @class build.ui.element.Element
 * @extends build.ui.Content
 */
Build('build.ui.element.Element', [ 'build::build.ui.Content' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Content',
		/**
		 * @constructor
		 */
		$constructor : function Element(text) {
			$super(this)(text);
		}
	});
});