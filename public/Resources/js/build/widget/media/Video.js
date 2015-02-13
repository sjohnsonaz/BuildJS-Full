/**
 * @class build.widget.media.Video
 * @extends build.widget.media.Audio
 */
Build('build.widget.media.Video', [ 'build::build.widget.media.Audio' ], function(define, $super) {
	define({
		$extends : 'build.widget.media.Audio',
		/**
		 * @constructor
		 */
		$constructor : function Video(src) {
			$super(this)(src);
		},
		$prototype : {
			type : 'video'
		}
	});
});