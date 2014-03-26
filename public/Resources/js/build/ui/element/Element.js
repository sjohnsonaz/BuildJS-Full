Build('build.ui.element.Element', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {
			$super(this)();
			this.watchProperty('text', 'innerHTML');
		},
		$prototype : {
			build : function() {
			}
		}
	});
});