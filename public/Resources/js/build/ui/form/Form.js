Build('build.ui.form.Form', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function() {
			$super(this)();
			this.type = 'form';
		}
	});
});