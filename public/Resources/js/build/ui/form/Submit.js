Build('build.ui.form.Submit', [ 'build::build.ui.form.Button' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Button',
		$constructor : function(text) {
			$super(this)(text);
			this.type = 'submit';
		}
	});
});