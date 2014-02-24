Build('build.ui.form.LineBreak', [ 'build::build.ui.Widget' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function(title) {
			$super(this)();
			this.type = 'br';
		},
		$prototype : {
			build : function() {
				$super().build(this)();
			}
		}
	});
});