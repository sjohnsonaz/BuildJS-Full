Build('build.ui.tab.TabContainer', [ 'build::build.ui.SwitcherPanel' ], function(define, $super) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		$constructor : function(parameters) {
			$super(this)(parameters);
		},
		$prototype : {}
	});
});