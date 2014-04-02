Build('build.widget.menu.MenuWidget', [ 'build::build.ui.Widget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {
			$super(this)();
		}
	});
});