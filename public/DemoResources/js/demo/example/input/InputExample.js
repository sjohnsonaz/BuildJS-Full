/**
 * @class demo.example.input.InputExample
 * @extends build.ui.Container
 */
Build('demo.example.input.InputExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header1', 'demo::demo.example.input.ButtonExample', 'demo::demo.example.input.FormFieldExample', 'demo::demo.example.input.FormExample',
		'demo::demo.example.input.ToggleExample', 'demo::demo.example.input.TextEditorExample', 'demo::demo.example.input.CalendarExample', 'demo::demo.example.input.UploadExample' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function InputExample() {
			$super(this)();
			var header0 = build.ui.element.Header1.create('Widget Form');
			this.addChild(header0);

			this.addChild(demo.example.input.ButtonExample.create());
			this.addChild(demo.example.input.FormFieldExample.create());
			this.addChild(demo.example.input.FormExample.create());
			this.addChild(demo.example.input.ToggleExample.create());
			this.addChild(demo.example.input.TextEditorExample.create());
			this.addChild(demo.example.input.CalendarExample.create());
			this.addChild(demo.example.input.UploadExample.create());
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});