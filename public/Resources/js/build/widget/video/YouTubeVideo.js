/**
 * @class build.widget.video.YouTubeVideo
 * @extends build::build.ui.Widget
 */
Build('build.widget.video.YouTubeVideo', [ 'build::build.ui.Widget' ], function(define, $super, helper) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function YouTubeVideo() {
			loadVideoById({
				'videoId' : 'bHQqvYy5KYo',
				'startSeconds' : 5,
				'endSeconds' : 60,
				'suggestedQuality' : 'large'
			});
		}
	});
});