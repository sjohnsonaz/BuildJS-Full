/**
 * @class demo.example.widget.TooltipExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.TooltipExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.form.input.Button', 'build::build.utility.Tooltip' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function TooltipExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Tooltips');
			this.addChild(header0);

			var button = build.form.input.Button.create('Tooltip Button');
			build.utility.Tooltip.create(button, 'Tooltip text', false, 'right');

			this.addChild(button);
		}
	});
});