/**
 * @class build.form.input.TextArea
 * @extends build.ui.Container
 */
Build('build.form.input.TextArea', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
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
			var self = this;
			this.watchProperty('value', 'innerHTML');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
			this.element.addEventListener('change', function() {
				self.value = self.element.value;
			});
		},
		$prototype : {
			type : 'textarea'
		}
	});
});