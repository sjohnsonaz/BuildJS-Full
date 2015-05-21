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
			this.watchProperty('forId', 'htmlFor');
			this.watchValue('control', control, null, function(value, current, cancel) {
				if (value) {
					value = value.element || value;
					self.forId = value.id;
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