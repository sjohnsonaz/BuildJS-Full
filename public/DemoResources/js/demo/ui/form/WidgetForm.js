Build('demo.ui.form.WidgetForm', [ 'build::build.ui.form.Form', 'build::build.ui.form.Button', 'build::build.ui.form.ButtonGroup', 'build::build.ui.element.Header1', 'build::build.ui.element.Paragraph', 'build::build.ui.form.FieldSet',
		'build::build.ui.form.FormControl', 'build::build.ui.form.Label', 'build::build.ui.form.Text', 'build::build.ui.form.TextArea', 'demo::demo.singleton.SingletonTest', 'demo::demo.alternatebase.ArrayChild',
		'build::build.utility.TemplateParser' ], function(define, $super, helper) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function WidgetForm() {
			$super(this)();
			var header0 = build.ui.element.Header1.create('Widget Form');
			this.addChild(header0);
			var button = build.ui.form.Button.create('Button 1');
			this.addChild(button);
			var buttonGroup = build.ui.form.ButtonGroup.create();
			var button2 = build.ui.form.Button.create('Button 2');
			buttonGroup.addChild(button2);
			var button3 = build.ui.form.Button.create('Button 3');
			button3.addClass('button-danger');
			buttonGroup.addChild(button3);
			var button4 = build.ui.form.Button.create('Button 4');
			button4.addClass('button-primary');
			buttonGroup.addChild(button4);
			this.addChild(buttonGroup);

			this.addChild(build.ui.element.Paragraph.create(new demo.singleton.SingletonTest().data));
			this.addChild(build.ui.element.Paragraph.create(new demo.singleton.SingletonTest().data));
			// arrayBase = new demo.alternatebase.ArrayBase();
			// arrayChild = new demo.alternatebase.ArrayChild();
			// this.addChild(build.ui.element.Paragraph.create(arrayChild.toString()));
			var templateParser = build.utility.TemplateParser();
			var parsedText = templateParser.parse('{{i:user}} test');
			this.addChild(build.ui.element.Paragraph.create(parsedText));

			var fieldSet = build.ui.form.FieldSet.create('Text Field FieldSet');
			var text = build.ui.form.Text.create();
			text.placeholder = 'Text';
			text.subscribe(function(value) {
				console.log('Entered value: ' + value);
			});
			fieldSet.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Text Field'), text));

			this.wrap = function(model) {
				text.value = model.text;
			};
			this.unwrap = function(model) {
				model.text = text.value;
			};

			var textArea = build.ui.form.TextArea.create();
			textArea.placeholder = 'Text';
			fieldSet.addChild(build.ui.form.FormControl.create(null, textArea));
			this.addChild(fieldSet);
		}
	});
});