/**
 * @class build.form.input.CheckBox
 * @extends build.ui.Container
 */
Build('build.form.input.CheckBox', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function CheckBox(name, value) {
			$super(this)(null, value);
			var self = this;
			this.watchProperty('name', 'name', name);
			this.watchProperty('value', 'checked', value, function(value) {
				return self.element.indeterminate ? -1 : value;
			}, function(value, current, cancel) {
				if (value == -1) {
					self.element.indeterminate = true;
					return false;
				} else {
					self.element.indeterminate = false;
					return value;
				}
			});
			this.element.type = 'checkbox';
			this.element.addEventListener('change', function() {
				self.value = self.element.checked;
			});
		},
		$prototype : {
			type : 'input'
		}
	});
});