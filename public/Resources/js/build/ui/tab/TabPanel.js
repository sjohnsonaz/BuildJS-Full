Build('build.ui.tab.TabPanel', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function TabPanel(title) {
			$super(this)();
			this.watchValue('title', title || 'Tab');
		},
		$prototype : {}
	});
});