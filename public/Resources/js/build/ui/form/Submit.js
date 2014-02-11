Build('build.ui.form.Submit', [ 'build.ui.form.Button' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Button',
		$constructor : function(type) {
			$super(this)(type || 'submit');
		}
	});
});