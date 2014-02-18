Build('build.ui.Application', [ 'build.ui.Panel', 'build.history.HashRouter' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(parameters) {
			$super(this)(parameters);
			this.router = new build.history.HashRouter();
		}
	});
});