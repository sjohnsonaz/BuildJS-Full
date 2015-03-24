/**
 * @class demo.example.remote.RemoteExample
 * @extends build.ui.Container
 */
Build('demo.example.remote.RemoteExample', [ 'build::build.ui.Container', 'build::build.ui.element.Iframe' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function RemoteExample() {
			$super(this)();
			this.iframe = build.ui.element.Iframe.create();
			this.addChild(this.iframe);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				var self = this;
				this.iframe.subscribe('content', function(value) {
					if (value) {
						//this.iframe.postMessage.send('Here is some data');
					}
				});
				this.iframe.src = 'inner.html';
			}
		}
	});
});