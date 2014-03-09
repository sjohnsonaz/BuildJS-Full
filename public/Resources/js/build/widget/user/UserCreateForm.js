Build('build.widget.user.UserCreateForm', [ 'build::build.ui.form.Form' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function() {
			$super(this)();
		}
	});
});