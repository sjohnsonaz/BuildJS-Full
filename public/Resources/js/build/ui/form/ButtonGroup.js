Build('build.ui.form.ButtonGroup', [ 'build::build.ui.Widget' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function ButtonGroup() {
			$super(this)();
			this.directAppend = true;
		}
	});
});