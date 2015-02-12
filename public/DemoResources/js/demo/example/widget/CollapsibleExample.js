/**
 * @class demo.example.widget.CollapsibleExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.CollapsibleExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.collapsible.Collapsible', 'build::build.ui.Text' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function CollapsibleExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Collapsibles');
			this.addChild(header0);

			var collapsible = build.widget.collapsible.Collapsible.create('Collapsible Header', false);

			collapsible.addChild(build.ui.Text.create('Collapsible text'));
			this.addChild(collapsible);
		}
	});
});