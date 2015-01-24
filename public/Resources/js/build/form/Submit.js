/**
 * @class build.form.Submit
 * @extends build.form.input.Button
 */
Build('build.form.Submit', [ 'build::build.form.input.Button' ], function(define, $super) {
	define({
		$extends : 'build.form.input.Button',
		/**
		 * @constructor
		 * @param text
		 * @param value
		 */
		/**
		 * @property type
		 */
		$constructor : function Submit(text, value) {
			$super(this)(text, value);
			this.element.type = 'submit';
		},
		$prototype : {
			type : 'button'
		}
	});
});