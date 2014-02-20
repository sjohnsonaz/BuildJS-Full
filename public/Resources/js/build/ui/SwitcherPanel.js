Build('build.ui.SwitcherPanel', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(active) {
			$super(this)();
			this.active = ko.observable(0 || active);
		}
	});
});