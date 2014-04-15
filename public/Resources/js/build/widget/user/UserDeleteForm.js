/**
 * @class build.widget.user.UserDeleteForm
 * @extends build.ui.form.Form
 */
Build('build.widget.user.UserDeleteForm', [ 'build::build.ui.form.Form' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		/**
		 * @constructor
		 */
		$constructor : function UserDeleteForm() {
			$super(this)();
		}
	});
});