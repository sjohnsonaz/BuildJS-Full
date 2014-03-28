Build('build.ui.Panel', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {
			$super(this)();
		}
	});
});