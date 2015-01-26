/**
 * @class build.form.input.TextArea
 * @extends build.ui.Container
 */
Build('build.form.input.TextArea', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
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