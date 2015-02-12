/**
 * @class build.widget.media.Source
 * @extends build.ui.Widget
 */
Build('build.widget.media.Source', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Source() {
			$super(this)();
		},
		$prototype : {
			type : 'source'
		}
	});
});