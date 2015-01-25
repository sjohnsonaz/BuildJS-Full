/**
 * @class build.form.input.RadioButton
 * @extends build.form.Content
 */
Build('build.form.input.RadioButton', [ 'build::build.ui.Content' ], function(define, $super) {
	define({
		$extends : 'build.ui.Content',
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