Build('build.ui.form.Form', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(parameters) {
			parameters = parameters || {};
			parameters.type = parameters.type || 'form';
			$super(this)(parameters);
		}
	});
});