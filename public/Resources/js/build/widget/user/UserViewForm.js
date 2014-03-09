Build('build.widget.user.UserViewForm', [ 'build::build.ui.form.Form' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function() {
			$super(this)();
		}
	});
});