/**
 * @class build.ui.form.Button
 * @extends build.ui.form.FormElement
 */
Build('build.ui.form.Button', [ 'build::build.ui.form.FormElement' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.FormElement',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Button(text, value) {
			$super(this)(text, value);
			this.type = 'button';
		},
		$prototype : {
			/**
			 * @method init
			 * @param text
			 * @param value
			 */
			init : function(text, value) {
				$super().init(this)(text, value);
				this.element.type = 'button';
			}
		}
	});
});