/**
 * @class build.ui.form.RadioButton
 * @extends build.ui.form.FormElement
 */
Build('build.ui.form.CheckBox', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		/**
		 * @constructor
		 */
		$constructor : function CheckBox(name, value) {
			$super(this)(null, value);
			this.type = 'input';
			this.watchProperty('name');
			this.watchProperty('value', 'checked');
		},
		$prototype : {
			init : function(name, value) {
				$super().init(this)(null, value);
				this.element.addEventListener('change', function() {
					this.value = this.element.checked;
				}.bind(this));
				this.element.type = 'checkbox';
				this.name = name;
			}
		}
	});
});