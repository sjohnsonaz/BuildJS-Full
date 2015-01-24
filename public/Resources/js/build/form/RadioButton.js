/**
 * @class build.form.RadioButton
 * @extends build.form.FormElement
 */
Build('build.form.RadioButton', [ 'build::build.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.form.FormElement',
		/**
		 * @constructor
		 */
		$constructor : function RadioButton(name, value) {
			$super(this)(null, value);
			this.watchProperty('name', 'name', name);
			this.element.type = 'radio';
		},
		$prototype : {
			type : 'input'
		}
	});
});