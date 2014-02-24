Build('build.ui.form.HorizontalRule', [ 'build::build.ui.Widget' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function(title) {
			$super(this)();
			this.type = 'hr';
		},
		$prototype : {
			build : function() {
				$super().build(this)();
			}
		}
	});
});