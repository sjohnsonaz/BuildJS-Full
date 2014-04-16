/**
 * @class build.ui.form.Submit
 * @extneds build.ui.form.Button
 */
Build('build.ui.form.Submit', [ 'build::build.ui.form.Button' ], function(define, $super, merge, safe) {
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
			this.type = 'button';
		},
		$prototype : {
			/**
			 * @method init
			 * @param text
			 * @param value
			 */
			init : function(text, value) {
				$super().init(this)(text, value);
				this.element.type = 'submit';
			}
		}
	});
});