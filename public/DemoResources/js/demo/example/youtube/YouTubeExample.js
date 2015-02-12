/**
 * @class demo.example.youtube.YouTubeExample
 * @extends build.ui.Container
 */
Build('demo.example.youtube.YouTubeExample', [ 'build::build.ui.Container', '#build::build.widget.video.YouTubeVideo' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function YouTubeExample() {
			$super(this)();
			//this.youTube = build.widget.video.YouTubeVideo.create('CF0KIsQR6A4');
			//this.addChild(this.youTube);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});