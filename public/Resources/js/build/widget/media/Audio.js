/**
 * @class build.widget.media.Audio
 * @extends build.ui.Widget
 */
Build('build.widget.media.Audio', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Audio() {
			$super(this)();
		},
		$prototype : {
			type : 'audio'
		}
	});
});