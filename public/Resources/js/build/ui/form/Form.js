Build('build.ui.form.Form', [ 'build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(type) {
			$super(this)(type || 'form');
		}
	});
});