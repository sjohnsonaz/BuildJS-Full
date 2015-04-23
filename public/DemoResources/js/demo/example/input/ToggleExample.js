/**
 * @class demo.example.input.ToggleExample
 * @extends build.ui.Container
 */
Build('demo.example.input.ToggleExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.toggle.ButtonToggle', 'build::build.widget.toggle.SlideToggle' ], function($define,
		$super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function ToggleExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Toggle Buttons');
			this.addChild(header0);

			var buttonToggle = build.widget.toggle.ButtonToggle.create('button-toggle', false, 'Button Toggle');
			this.addChild(buttonToggle);
			var slideToggle = build.widget.toggle.SlideToggle.create('Slide Toggle');
			this.addChild(buttonToggle);
		}
	});
});