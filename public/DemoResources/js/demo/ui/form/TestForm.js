Build('demo.ui.form.TestForm', [ 'build::build.ui.form.Form' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function(parameters) {
			parameters = parameters || {};
			parameters.template = parameters.template || true;
			$super(this)(parameters);
		}
	});
});