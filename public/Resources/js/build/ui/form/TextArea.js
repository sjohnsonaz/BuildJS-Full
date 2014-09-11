/**
 * @class build.ui.form.TextArea
 * @extends build.ui.form.FormElement
 */
Build('build.ui.form.TextArea', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		/**
		 * @constructor
		 * @param text
		 * @param value
		 */
		/**
		 * @property type
		 * @property value
		 * @property placeholder
		 * @property name
		 */
		$constructor : function TextArea(text, value) {
			$super(this)(text, value);
			this.watchProperty('value', 'innerHTML');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
			this.element.addEventListener('change', function() {
				this.value = this.element.value;
			}.bind(this));
		},
		$prototype : {
			type : 'textarea'
		}
	});
});