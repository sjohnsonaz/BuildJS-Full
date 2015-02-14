/**
 * @class demo.example.widget.WidgetExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.WidgetExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header1', 'demo::demo.example.widget.CarouselExample', 'demo::demo.example.widget.ProgressBarExample', 'demo::demo.example.widget.ImageExample',
		'demo::demo.example.widget.ModalExample', 'demo::demo.example.widget.CollapsibleExample', 'demo::demo.example.widget.CodeExample', 'demo::demo.example.widget.MediaExample', 'demo::demo.example.widget.CanvasExample',
		'build::build.ui.element.Paragraph'
//, 'demo::demo.singleton.SingletonTest', 'demo::demo.alternatebase.ArrayChild'
], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function WidgetExample() {
			$super(this)();
			var header0 = build.ui.element.Header1.create('Widget Form');
			this.addChild(header0);

			this.addChild(demo.example.widget.CarouselExample.create());

			this.addChild(demo.example.widget.ProgressBarExample.create());

			this.addChild(demo.example.widget.ImageExample.create());

			this.addChild(demo.example.widget.ModalExample.create());

			this.addChild(demo.example.widget.CollapsibleExample.create());

			this.addChild(demo.example.widget.CodeExample.create());

			this.addChild(demo.example.widget.MediaExample.create());

			this.addChild(demo.example.widget.CanvasExample.create());

			// this.addChild(build.ui.element.Paragraph.create(new demo.singleton.SingletonTest().data));
			// this.addChild(build.ui.element.Paragraph.create(new demo.singleton.SingletonTest().data));
			// arrayBase = new demo.alternatebase.ArrayBase();
			// arrayChild = new demo.alternatebase.ArrayChild();
			// this.addChild(build.ui.element.Paragraph.create(arrayChild.toString()));
			// this.addChild(build.ui.element.Paragraph.create('{i:[user]} test'));
		}
	});
});