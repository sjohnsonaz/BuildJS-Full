/**
 * @class build.ui.form.Label
 * @extends build.ui.form.FormElement
 */
Build('build.ui.form.Label', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		/**
		 * @constructor
		 * @param text
		 * @param control
		 * @param forId
		 */
		$constructor : function Label(text, control) {
			$super(this)(text);
		},
		$prototype : {
			type : 'label',
			/**
			 * @method init
			 * @param text
			 * @param control
			 */
			init : function(text, control) {
				$super().init(this)(text);
				this.watchAttribute('forId', 'for');
				this.watchValue('control', control, null, function(value, cancel) {
					if (control) {
						control = control.element || control;
						this.forId = control.id;
					} else {
						this.forId = '';
					}
					return value;
				}.bind(this));
			}
		}
	});
});