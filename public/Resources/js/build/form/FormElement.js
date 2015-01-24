/**
 * @class build.form.FormElement
 * @extends build.ui.element.Element
 */
Build('build.form.FormElement', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 * @param text
		 * @param value
		 */
		$constructor : function FormElement(text, value) {
			$super(this)(text);
		}
	});
});