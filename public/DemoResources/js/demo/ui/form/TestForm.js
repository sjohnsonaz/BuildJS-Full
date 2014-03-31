Build('demo.ui.form.TestForm', [ 'build::build.ui.template.KnockoutWidget' ], function(define, $super) {
	define({
		$extends : 'build.ui.template.KnockoutWidget',
		$constructor : function TestForm() {
			$super(this)();
			this.template = true;
		}
	});
});