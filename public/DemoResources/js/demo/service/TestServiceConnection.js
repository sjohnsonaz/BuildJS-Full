Build('demo.service.TestServiceConnection', [ 'build::build.service.ServiceConnection' ], function(define, $super, merge) {
	define({
		$extends : 'build.service.ServiceConnection',
		$constructor : function(base) {
			$super(this)(base || '/api/test/rest');
			this.addRoute({
				name : 'getRest',
				action : function(success) {
				}
			});
		}
	});
});