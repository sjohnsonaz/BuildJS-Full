Build('demo.ui.form.RemotePanel', [ 'build::build.ui.element.Iframe' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function RemotePanel() {
			$super(this)();
			this.iframe = build.ui.element.Iframe.create();
			this.addChild(this.iframe);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.iframe.subscribe('content', function(value) {
					if (value) {
						//this.iframe.postMessage.send('Here is some data');
					}
				}.bind(this));
				this.iframe.src = 'inner.html';
			}
		}
	});
});