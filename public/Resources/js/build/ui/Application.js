Build('build.ui.Application', [ 'build::build.ui.Panel', 'build::build.history.HashRouter' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(parameters) {
			$super(this)(parameters);
			this.router = new build.history.HashRouter();
		}
	});
});