/**
 * @class demo.example.input.InputExample
 * @extends build.ui.Container
 */
Build('demo.example.input.InputExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header1', 'demo::demo.example.widget.ButtonExample', 'demo::demo.example.widget.FormFieldExample', 'demo::demo.example.widget.FormExample',
		'demo::demo.example.widget.CalendarExample' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function InputExample() {
			$super(this)();
			var header0 = build.ui.element.Header1.create('Widget Form');
			this.addChild(header0);

			this.addChild(demo.example.widget.ButtonExample.create());
			this.addChild(demo.example.widget.FormFieldExample.create());
			this.addChild(demo.example.widget.FormExample.create());
			this.addChild(demo.example.widget.CalendarExample.create());
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});