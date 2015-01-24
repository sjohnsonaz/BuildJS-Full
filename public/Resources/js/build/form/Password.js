/**
 * @class build.form.Password
 * @extends build.form.Text
 */
Build('build.form.Password', [ 'build::build.form.Text' ], function(define, $super) {
	define({
		$extends : 'build.form.Text',
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