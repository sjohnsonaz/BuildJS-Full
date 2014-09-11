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
			this.watchProperty('name');
			this.watchProperty('value', 'checked');
			this.element.type = 'checkbox';
			this.name = name;
		},
		$prototype : {
			type : 'input',
			init : function(name, value) {
				$super().init(this)(null, value);
				this.element.addEventListener('change', function() {
					this.value = this.element.checked;
				}.bind(this));
			}
		}
	});
});