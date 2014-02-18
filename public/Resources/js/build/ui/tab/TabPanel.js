Build('build.ui.tab.TabPanel', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(parameters) {
			$super(this)(parameters);
			this.title = null;
		},
		$prototype : {}
	});
});