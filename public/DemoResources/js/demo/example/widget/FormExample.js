Build('demo.example.widget.FormExample', [ 'build::build.form.Form', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.form.FieldSet', 'build::build.form.FormControl', 'build::build.form.Label',
		'build::build.form.Text', 'build::build.form.TextArea', 'demo::demo.example.widget.TestServiceConnection' ], function(define, $super) {
	define({
		$extends : 'build.form.Form',
		$constructor : function FormExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Forms');
			this.addChild(header0);

			var fieldSet = build.form.FieldSet.create('Text Field FieldSet');
			var text = build.form.Text.create();
			text.placeholder = 'Text';
			text.subscribe(function(value) {
				console.log('Entered value: ' + value);
			});
			fieldSet.addChild(build.form.FormControl.create(build.form.Label.create('Text Field'), text));

			this.wrap = function(model) {
				text.value = model.text;
			};
			this.unwrap = function(model) {
				model.text = text.value;
			};

			var textArea = build.form.TextArea.create();
			textArea.placeholder = 'Text';
			fieldSet.addChild(build.form.FormControl.create(null, textArea));
			this.addChild(fieldSet);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				var testServiceConnection = new demo.example.widget.TestServiceConnection();
				testServiceConnection.getRest(function(data, request) {
					this.model = data;
				}.bind(this));
			}
		}
	});
});