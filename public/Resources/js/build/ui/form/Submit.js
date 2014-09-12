/**
 * @class build.ui.form.Submit
 * @extends build.ui.form.Button
 */
Build('build.ui.form.Submit', [ 'build::build.ui.form.Button' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Button',
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