Build('build.ui.tab.TabContainer', [ 'build.ui.SwitcherPanel' ], function(define, $super) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		$constructor : function(type) {
			$super(this)(type);
		},
		$prototype : {}
	});
});