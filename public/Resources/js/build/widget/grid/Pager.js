Build('build.widget.grid.Pager', [ 'build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {
			$super(this)();
			this.type = 'ul';
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});