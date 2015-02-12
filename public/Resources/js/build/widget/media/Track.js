/**
 * @class build.widget.media.Track
 * @extends build.ui.Widget
 */
Build('build.widget.media.Track', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Track() {
			$super(this)();
		},
		$prototype : {
			type : 'track'
		}
	});
});