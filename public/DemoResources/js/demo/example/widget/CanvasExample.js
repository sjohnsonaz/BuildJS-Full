/**
 * @class demo.example.widget.CanvasExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.CanvasExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.canvas.Canvas' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function MediaExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Canvas');
			this.addChild(header0);

			var canvas = build.widget.canvas.Canvas.create();

			this.addChild(canvas);
		}
	});
});