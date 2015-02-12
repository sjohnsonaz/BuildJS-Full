/**
 * @class demo.example.widget.ImageExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.ImageExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.ui.element.Image' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function ImageExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Images');
			this.addChild(header0);

			var image = build.ui.element.Image.create('/Resources/img/spinner0.gif');
			image.subscribe('loaded', function(value) {
				console.log('Image loaded from ' + value);
			});
			this.addChild(image);
		}
	});
});