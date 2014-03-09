Build('build.widget.user.UserListForm', [ 'build::build.ui.form.Form' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function() {
			$super(this)();
		}
	});
});