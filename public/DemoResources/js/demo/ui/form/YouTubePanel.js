Build('demo.ui.form.YouTubePanel', [ 'build::build.ui.Panel', 'build::build.widget.video.YouTubeVideo' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function() {
			$super(this)();
			this.youTube = build.widget.video.YouTubeVideo.create('CF0KIsQR6A4');
			this.addChild(this.youTube);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});