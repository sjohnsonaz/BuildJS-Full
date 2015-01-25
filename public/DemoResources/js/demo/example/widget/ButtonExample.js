Build('demo.example.widget.ButtonExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.form.input.Button', 'build::build.form.container.ButtonGroup' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		$constructor : function ButtonExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Buttons');
			this.addChild(header0);

			var button = build.form.input.Button.create('Button 1');
			this.addChild(button);
			var buttonGroup = build.form.container.ButtonGroup.create();
			var button2 = build.form.input.Button.create('Button 2');
			buttonGroup.addChild(button2);
			var button3 = build.form.input.Button.create('Button 3');
			button3.addClass('button-danger');
			buttonGroup.addChild(button3);
			var button4 = build.form.input.Button.create('Button 4');
			button4.addClass('button-primary');
			buttonGroup.addChild(button4);
			this.addChild(buttonGroup);
		}
	});
});