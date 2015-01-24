/**
 * @class build.form.Text
 * @extends build.form.FormElement
 */
Build('build.form.Text', [ 'build::build.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.form.FormElement',
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
		$constructor : function Text(text, value) {
			$super(this)(text, value);
			this.watchProperty('value');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
			this.element.addEventListener('change', function() {
				this.value = this.element.value;
			}.bind(this));
			this.element.type = 'text';
		},
		$prototype : {
			type : 'input'
		}
	});
});