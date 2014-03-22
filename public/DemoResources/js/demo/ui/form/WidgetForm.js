Build('demo.ui.form.WidgetForm', [ 'build::build.ui.form.Form', 'build::build.ui.form.Button', 'build::build.ui.form.ButtonGroup', 'build::build.ui.form.Header1', 'build::build.ui.form.Paragraph', 'build::build.ui.form.FieldSet',
		'build::build.ui.form.FormControl', 'build::build.ui.form.Label', 'build::build.ui.form.Text', 'build::build.ui.form.TextArea', 'demo::demo.singleton.SingletonTest', 'demo::demo.alternatebase.ArrayBase' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function() {
			$super(this)();
			var header0 = build.ui.form.Header1.create('Widget Form');
			this.addChild(header0);
			var button = build.ui.form.Button.create('Button 1');
			this.addChild(button);
			var buttonGroup = build.ui.form.ButtonGroup.create();
			buttonGroup.addChild(build.ui.form.Button.create('Button 2'));
			buttonGroup.addChild(build.ui.form.Button.create('Button 3'));
			buttonGroup.addChild(build.ui.form.Button.create('Button 4'));
			this.addChild(buttonGroup);

			this.addChild(build.ui.form.Paragraph.create(new demo.singleton.SingletonTest().data));
			this.addChild(build.ui.form.Paragraph.create(new demo.singleton.SingletonTest().data));
			this.addChild(build.ui.form.Paragraph.create(new demo.alternatebase.ArrayBase().toString()));

			var fieldSet = build.ui.form.FieldSet.create('Text Field FieldSet');
			var text = build.ui.form.Text.create();
			text.placeholder('Text');
			fieldSet.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Text Field'), text));

			this.wrap = function(model) {
				text.text(model.text);
			};
			this.unwrap = function(model) {
				model.text = text.text();
			};

			var textArea = build.ui.form.TextArea.create();
			textArea.placeholder('Text');
			fieldSet.addChild(textArea);
			this.addChild(fieldSet);
		}
	});
});