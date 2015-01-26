/**
 * @class build.form.Label
 * @extends build.ui.Container
 */
Build('build.form.Label', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 * @param text
		 * @param control
		 * @param forId
		 */
		$constructor : function Label(text, control) {
			$super(this)(text);
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
		},
		$prototype : {
			type : 'label'
		}
	});
});