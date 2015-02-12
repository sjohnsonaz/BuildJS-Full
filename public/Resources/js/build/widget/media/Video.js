/**
 * @class build.widget.media.Video
 * @extends build.ui.Container
 */
Build('build.widget.media.Video', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Video(src) {
			$super(this)();
			this.watchProperty('src', 'src', src);
			this.watchProperty('loaded', 'src');
			this.addEvent('load', function(element, event) {
				this.publish('loaded');
			}, false, this);
		},
		$prototype : {
			type : 'video'
		}
	});
});