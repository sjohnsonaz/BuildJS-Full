/**
 * @class build.widget.video.YouTubeVideo
 * @extends build.ui.Widget
 */
Build('build.widget.video.YouTubeVideo', [ 'build::build.ui.Widget', 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function YouTubeVideo(videoId) {
			$super(this)();
			this.watchValue('videoId');
		},
		$prototype : {
			type : 'iframe',
			/**
			 * 
			 */
			init : function(videoId) {
				$super().init(this)();
				this.subscribe('videoId', function(value) {
					this.element.src = 'http://www.youtube.com/embed/' + value;
				}.bind(this));
				this.videoId = videoId;
			}
		},
		$static : {
			onYouTubePlayerReady : {}
		}
	});
});

function onYouTubePlayerReady(playerId) {
	var callback = build.widget.video.YouTubeVideo.onYouTubePlayerReady[playerId];
	if (callback) {
		callback();
	}
}