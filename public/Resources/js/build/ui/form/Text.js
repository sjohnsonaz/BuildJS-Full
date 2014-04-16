/**
 * @class build.ui.form.Text
 * @extneds build.ui.form.FormElement
 */
Build('build.ui.form.Text', [ 'build::build.ui.form.FormElement' ], function(define, $super, merge, safe) {
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
		$constructor : function Text(text, value) {
			$super(this)(text, value);
			this.type = 'input';
			this.watchProperty('value');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
		},
		$prototype : {
			/**
			 * @method init
			 * @param text
			 * @param value
			 */
			init : function(text, value) {
				$super().init(this)(text, value);
				this.element.type = 'text';
			}
		}
	});
});