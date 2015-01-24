/**
 * @class build.form.input.CheckBox
 * @extends build.form.FormElement
 */
Build('build.form.input.CheckBox', [ 'build::build.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.form.FormElement',
		/**
		 * @constructor
		 */
		$constructor : function CheckBox(name, value) {
			$super(this)(null, value);
			this.watchProperty('name', 'name', name);
			this.watchProperty('value', 'checked', value);
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