/**
 * @class build.ui.element.Paragraph
 * @extends build.ui.Widget
 */
Build('build.ui.form.Paragraph', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
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