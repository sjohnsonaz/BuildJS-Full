/**
 * @class build.widget.video.YouTubeVideo
 * @extends build::build.ui.Widget
 */
Build('build.widget.video.YouTubeVideo', [ 'build::build.ui.Widget', 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js' ], function(define, $super, helper) {
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
			/**
			 * 
			 */
			init : function(videoId) {
				$super().init(this)();
				this.subscribe('videoId', function(value) {
					this.load();
				}.bind(this));
				this.videoId = videoId;
			},
			/**
			 * 
			 */
			load : function() {
				if (this.videoId) {
					var preloadElement = document.createElement('div');
					var preloadId = this.id + '-video';
					preloadElement.id = preloadId;
					this.getPreloadContainer().appendChild(preloadElement);
					window.setTimeout(function() {
						build.widget.video.YouTubeVideo.onYouTubePlayerReady[this.id] = function() {
							console.log('Video is ready');
						};
						player = swfobject.embedSWF('http://www.youtube.com/v/' + this.videoId + '?enablejsapi=1&playerapiid=ytplayer&version=3', preloadId, "425", "356", "8", null, null, {
							allowScriptAccess : "always"
						}, {
							id : preloadId
						}, function(playerHandle) {
							this.clearChildren();
							this.element.appendChild(document.getElementById(preloadId));
						}.bind(this));
					}.bind(this), 100);
				}
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