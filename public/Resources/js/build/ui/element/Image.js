/**
 * @class build.ui.element.Image
 * @extends: build.ui.Widget
 */
Build('build.ui.element.Image', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function Image(src) {
			$super(this)();
			this.type = 'img';
			this.watchProperty('src');
			this.watchProperty('loaded', 'src');
		},
		$prototype : {
			init : function(src) {
				$super().init(this)();
				this.src = src;
				this.addEvent('load', function(element, event) {
					this.publish('loaded');
				}, false, this);
			}
		}
	});
});