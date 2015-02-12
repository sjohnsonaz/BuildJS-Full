/**
 * @class build.ui.element.Div
 * @extends build.ui.element.Element
 */
Build('build.ui.element.Div', [ 'build::build.ui.element.Element' ], function($define, $super) {
	$define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Div(text) {
			$super(this)(text);
		},
		$prototype : {
			type : 'div'
		}
	});
});