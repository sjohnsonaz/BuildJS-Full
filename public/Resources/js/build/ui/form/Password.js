/**
 * @class build.ui.form.Password
 * @extends build.ui.form.Text
 */
Build('build.ui.form.Password', [ 'build::build.ui.form.Text' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Text',
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
			this.type = 'input';
		},
		$prototype : {
			/**
			 * @method init
			 * @param text
			 * @param value
			 */
			init : function(text, value) {
				$super().init(this)(text);
				this.element.type = 'password';
			}
		}
	});
});