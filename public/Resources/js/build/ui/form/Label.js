/**
 * @class build.ui.form.Label
 * @extends build.ui.form.FormElement
 */
Build('build.ui.form.Label', [ 'build::build.ui.form.FormElement' ], function(define, $super, merge, safe) {
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
			this.type = 'label';
			this.watchValue('control', control);
			this.watchAttribute('forId', 'for');
		},
		$prototype : {
			/**
			 * @method init
			 * @param text
			 * @param control
			 */
			init : function(text, control) {
				$super().init(this)(text);
				this.subscribe('control', function(value) {
					if (this.control) {
						var control = this.control.element || this.control;
						this.forId = control.id;
					} else {
						this.forId = '';
					}
				}.bind(this));
			}
		}
	});
});