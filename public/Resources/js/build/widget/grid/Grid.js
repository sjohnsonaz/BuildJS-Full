Build('build.widget.grid.Grid', [ 'build::build.ui.element.Table', 'build::build.widget.grid.Pager' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Table',
		$constructor : function() {
			$super(this)();
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});