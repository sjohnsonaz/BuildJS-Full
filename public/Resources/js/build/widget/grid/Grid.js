Build('build.widget.grid.Grid', [ 'build::build.ui.element.Table', 'build::build.widget.grid.Pager' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Table',
		$constructor : function() {
			$super(this)();
			this.pager = build.widget.grid.Pager.create();
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			},
			refreshChildren : function() {
				$super().refreshChildren(this)();
				this.element.appendChild(this.pager.element);
			}
		}
	});
});