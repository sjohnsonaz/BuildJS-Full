/**
 * @class build.ui.element.Image
 * @extends: build.ui.Widget
 */
Build('build.ui.element.Image', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		$constructor : function Image(src) {
			$super(this)();
			this.watchProperty('src', 'src', src);
			this.watchProperty('loaded', 'src');
			this.addEvent('load', function(element, event) {
				this.publish('loaded');
			}, false, this);
		},
		$prototype : {
			type : 'img'
		}
	});
});