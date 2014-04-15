/**
 * @class build.widget.user.UserViewForm
 * @extends build.ui.form.Form
 */
Build('build.widget.user.UserViewForm', [ 'build::build.ui.form.Form' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		/**
		 * @constructor
		 */
		$constructor : function UserViewForm() {
			$super(this)();
		}
	});
});