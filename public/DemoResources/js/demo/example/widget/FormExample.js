Build('demo.example.widget.FormExample', [ 'build::build.ui.form.Form', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.ui.form.FieldSet', 'build::build.ui.form.FormControl', 'build::build.ui.form.Label',
		'build::build.ui.form.Text', 'build::build.ui.form.TextArea', 'demo::demo.example.widget.TestServiceConnection' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function FormExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Forms');
			this.addChild(header0);

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