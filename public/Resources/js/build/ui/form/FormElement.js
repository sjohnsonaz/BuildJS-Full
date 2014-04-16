/**
 * @class build.ui.form.FormElement
 * @extends build.ui.element.Element
 */
Build('build.ui.form.FormElement', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 * @param text
		 * @param value
		 */
		/**
		 * @property textHelpers
		 */
		$constructor : function FormElement(text, value) {
			$super(this)(text);
			this.textHelpers = true;
		},
		$prototype : {
			/**
			 * @method init
			 * @param text
			 * @param value
			 */
			init : function(text, value) {
				$super().init(this)(text);
				this.value = value || '';
				this.element.addEventListener('change', function() {
					this.value = this.element.value;
				}.bind(this));
			}
		}
	});
});