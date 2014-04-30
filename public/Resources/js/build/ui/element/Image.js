/**
 * @class build.ui.element.Image
 * @extends: build.ui.Widget
 */
Build('build.ui.element.Image', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function Image() {
			$super(this)();
			this.type = 'img';
			this.watchProperty('src');
		}
	});
});