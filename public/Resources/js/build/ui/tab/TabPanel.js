Build('build.ui.tab.TabPanel', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(title) {
			$super(this)();
			this.title = ko.observable(title || 'Tab');
		},
		$prototype : {}
	});
});