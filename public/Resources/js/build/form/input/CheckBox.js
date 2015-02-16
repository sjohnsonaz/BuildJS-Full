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
			this.watchProperty('name', 'name', name);
			this.watchProperty('value', 'checked', value, function(value) {
				return this.element.indeterminate ? -1 : value;
			}.bind(this), function(value, current, cancel) {
				if (value == -1) {
					this.element.indeterminate = true;
					return false;
				} else {
					this.element.indeterminate = false;
					return value;
				}
			}.bind(this));
			this.element.type = 'checkbox';
			this.element.addEventListener('change', function() {
				this.value = this.element.checked;
			}.bind(this));
		},
		$prototype : {
			type : 'input'
		}
	});
});