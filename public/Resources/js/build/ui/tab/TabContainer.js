Build('build.ui.tab.TabContainer', [ 'build::build.ui.SwitcherPanel' ], function(define, $super) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		$constructor : function() {
			$super(this)();
		},
		$prototype : {}
	});
});