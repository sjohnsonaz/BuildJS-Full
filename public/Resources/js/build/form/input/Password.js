/**
 * @class build.form.input.Password
 * @extends build.form.input.Text
 */
Build('build.form.input.Password', [ 'build::build.form.input.Text' ], function(define, $super) {
	define({
		$extends : 'build.form.input.Text',
		/**
		 * @constructor
		 * @param text
		 * @param value
		 */
		/**
		 * @property type
		 */
		$constructor : function Password(text, value) {
			$super(this)(text, value);
			this.element.type = 'password';
		},
		$prototype : {
			type : 'input'
		}
	});
});