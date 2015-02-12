/**
 * @class build.ui.element.Paragraph
 * @extends build.ui.element.Element
 */
Build('build.ui.element.Paragraph', [ 'build::build.ui.element.Element' ], function($define, $super) {
	$define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Paragraph(text) {
			$super(this)(text);
		},
		$prototype : {
			type : 'p'
		}
	});
});