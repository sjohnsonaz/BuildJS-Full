/**
 * @class build.ui.element.Header2
 * @extends build.ui.element.Element
 */
Build('build.ui.element.Header1', [ 'build::build.ui.element.Element' ], function($define, $super) {
	$define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Header1(text) {
			$super(this)(text);
		},
		$prototype : {
			type : 'h1'
		}
	});
});