/**
 * @class demo.example.widget.TestServiceConnection
 * @extends build.service.ServiceConnection
 */
Build('demo.example.widget.TestServiceConnection', [ 'build::build.service.ServiceConnection' ], function($define, $super) {
	$define({
		$extends : 'build.service.ServiceConnection',
		/**
		 * @constructor
		 */
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