/**
 * @class build.widget.media.Video
 * @extends build.ui.Widget
 */
Build('build.widget.media.Video', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Video() {
			$super(this)();
		},
		$prototype : {
			type : 'video'
		}
	});
});