Build('build.ui.SwitcherPanel', [ 'build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(parameters) {
			$super(this)(parameters);
			this.active = 0;
		},
		$prototype : {
			setActive : function(active) {
				this.active = active;
			},
			getActive : function() {
				return this.active;
			}
		}
	});
});