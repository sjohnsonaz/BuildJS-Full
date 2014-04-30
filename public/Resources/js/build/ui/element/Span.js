/**
 * @class build.ui.element.Span
 * @extends build.ui.element.Element
 */
Build('build.ui.form.Span', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Span(text) {
			$super(this)(text);
			this.type = 'span';
		}
	});
});