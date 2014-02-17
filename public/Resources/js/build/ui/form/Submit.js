Build('build.ui.form.Submit', [ 'build.ui.form.Button' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Button',
		$constructor : function(parameters) {
			parameters = parameters || {};
			parameters.type = parameters.type || 'submit';
			$super(this)(parameters);
		}
	});
});