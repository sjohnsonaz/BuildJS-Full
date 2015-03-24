/**
 * @class build.form.Label
 * @extends build.ui.Container
 */
Build('build.form.Label', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 * @param text
		 * @param control
		 * @param forId
		 */
		$constructor : function Label(text, control) {
			$super(this)(text);
			var self = this;
			this.watchAttribute('forId', 'for');
			this.watchValue('control', control, null, function(value, current, cancel) {
				if (control) {
					control = control.element || control;
					self.forId = control.id;
				} else {
					self.forId = '';
				}
				return value;
			});
		},
		$prototype : {
			type : 'label'
		}
	});
});