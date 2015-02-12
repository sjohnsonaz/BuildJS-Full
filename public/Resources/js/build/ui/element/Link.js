/**
 * @class build.ui.element.Link
 * @extends build.ui.element.Element
 */
Build('build.ui.element.Link', [ 'build::build.ui.element.Element' ], function($define, $super) {
	$define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Link(text) {
			$super(this)(text);
		},
		$prototype : {
			type : 'a'
		}
	});
});