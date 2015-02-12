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
		$constructor : function Track(src) {
			$super(this)();
			this.watchProperty('src', 'src', src);
			this.watchProperty('loaded', 'src');
			this.addEvent('load', function(element, event) {
				this.publish('loaded');
			}, false, this);
		},
		$prototype : {
			type : 'track'
		}
	});
});