Build('build.ui.form.Submit', [ 'build::build.ui.form.Button' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Button',
		$constructor : function(parameters) {
			$super(this)();
			this.type = 'submit';
		}
	});
});