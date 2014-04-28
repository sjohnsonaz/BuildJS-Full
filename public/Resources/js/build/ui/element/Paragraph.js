/**
 * @class build.ui.element.Paragraph
 * @extends build.ui.Widget
 */
Build('build.ui.element.Paragraph', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Paragraph(text) {
			$super(this)(text);
			this.type = 'p';
		}
	});
});