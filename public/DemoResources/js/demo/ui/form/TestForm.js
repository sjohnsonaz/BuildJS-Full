Build('demo.ui.form.TestForm', [ 'build::build.ui.form.Form' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function() {
			$super(this)();
			this.template = true;
		}
	});
});