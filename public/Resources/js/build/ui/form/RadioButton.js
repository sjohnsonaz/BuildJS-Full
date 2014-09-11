/**
 * @class build.ui.form.RadioButton
 * @extends build.ui.form.FormElement
 */
Build('build.ui.form.RadioButton', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		/**
		 * @constructor
		 */
		$constructor : function RadioButton(name, value) {
			$super(this)(null, value);
			this.watchProperty('name');
		},
		$prototype : {
			type : 'input',
			init : function(name, value) {
				$super().init(this)(null, value);
				this.element.type = 'radio';
				this.name = name;
			}
		}
	});
});