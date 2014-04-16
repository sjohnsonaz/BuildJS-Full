Build('demo.service.TestServiceConnection', [ 'build::build.service.ServiceConnection' ], function(define, $super, helper) {
	define({
		$extends : 'build.service.ServiceConnection',
		$constructor : function TestServiceConnection(base) {
			$super(this)(base || '/api/test/rest');
			this.addRoute({
				name : 'getRest',
				action : function(success) {
				}
			});
		}
	});
});