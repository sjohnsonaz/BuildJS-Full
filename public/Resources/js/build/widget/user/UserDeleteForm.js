Build('build.widget.user.UserDeleteForm', [ 'build::build.ui.form.Form' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function UserDeleteForm() {
			$super(this)();
		}
	});
});