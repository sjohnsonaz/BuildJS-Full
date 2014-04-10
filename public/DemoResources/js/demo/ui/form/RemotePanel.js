Build('demo.ui.form.RemotePanel', [ 'build::build.ui.Panel', 'build::build.utility.PostMessage' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function() {
			this.type = 'iframe';
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.element.src = 'inner.html';
				this.element.onload = function() {
					this.postMessage = new build.utility.PostMessage(this.element.contentWindow, 'test');
					this.postMessage.send('Here is some data');
				}.bind(this);
			}
		}
	});
});