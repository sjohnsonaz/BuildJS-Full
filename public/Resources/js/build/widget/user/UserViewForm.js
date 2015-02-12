/**
 * @class build.widget.user.UserViewForm
 * @extends build.form.Form
 */
Build('build.widget.user.UserViewForm', [ 'build::build.form.Form' ], function($define, $super) {
	$define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 */
		$constructor : function UserViewForm() {
			$super(this)();
		}
	});
});