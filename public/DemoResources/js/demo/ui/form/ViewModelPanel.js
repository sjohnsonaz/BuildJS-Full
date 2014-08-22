/**
 * @class demo.ui.form.ViewModelPanel
 * @extends build.ui.Container
 */
Build('demo.ui.form.ViewModelPanel', [ 'build::build.ui.Container', 'build::build.binding.TextBinding', 'build::build.binding.ValueBinding', 'build::build.binding.IfBinding', 'demo::demo.viewmodel.FormModel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function ViewModelPanel() {
			$super(this)();
			var header0 = build.ui.element.Header1.create('View Model Form');
			this.addChild(header0);

			//public
			formModel = new demo.viewmodel.FormModel();
			var viewModelParagraph0 = build.ui.element.Paragraph.create('');
			var viewModelText0 = build.ui.form.Text.create();
			var viewModelParagraph1 = build.ui.element.Paragraph.create('');

			build.binding.TextBinding.create(viewModelParagraph0, {
				sources : [ {
					source : formModel,
					property : 'testValue'
				}, ],
				format : 'This is some text: {0}!'
			});
			build.binding.ValueBinding.create(viewModelText0, formModel, 'testValue');
			build.binding.IfBinding.create(viewModelParagraph1, {
				sources : [ {
					source : formModel,
					property : 'testTrue'
				} ],
				format : '{0}'
			});

			this.addChild(viewModelText0);
			this.addChild(viewModelParagraph0);
		}
	});
});