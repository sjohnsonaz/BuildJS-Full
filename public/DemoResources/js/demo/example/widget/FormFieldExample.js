Build('demo.example.widget.FormFieldExample',
		[ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.ui.form.Select', 'build::build.ui.form.CheckBox', 'build::build.ui.form.RadioButton' ], function(define, $super) {
			define({
				$extends : 'build.ui.Container',
				$constructor : function FormFieldExample() {
					$super(this)();
					var header0 = build.ui.element.Header2.create('Form Fields');
					this.addChild(header0);

					var select = build.ui.form.Select.create();
					select.size = 4;
					select.multiple = true;
					select.addOption('test', 'test');
					select.addOption('thing', 'thing');
					this.addChild(select);

					var checkbox = build.ui.form.CheckBox.create('test', 'test', 'test');
					this.addChild(checkbox);
					var radiobutton = build.ui.form.RadioButton.create('test', 'test', 'test');
					this.addChild(radiobutton);
				}
			});
		});