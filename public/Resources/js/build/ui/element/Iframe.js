Build('build.ui.element.Iframe', [ 'build::build.ui.Widget', 'build::build.utility.PostMessage' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function Iframe() {
			$super(this)();
			this.type = 'iframe';
			this.watchProperty('src');
			this.watchProperty('content', 'contentWindow');
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.element.onload = function() {
					this.postMessage = new build.utility.PostMessage(this.element.contentWindow, 'test');
					this.publish('content');
				}.bind(this);
			}
		}
	});
});