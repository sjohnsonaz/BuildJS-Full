/**
 * @class demo.ui.form.ViewModelPanel
 * @extends build.ui.Container
 */
Build('demo.ui.form.ViewModelPanel', [ 'build::build.ui.Container', 'build::build.viewmodel.TextBinding', 'build::build.viewmodel.ValueBinding' ], function(define, $super) {
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

			build.viewmodel.TextBinding.create(viewModelParagraph0, formModel, 'testValue');
			build.viewmodel.ValueBinding.create(viewModelText0, formModel, 'testValue');

			this.addChild(viewModelText0);
			this.addChild(viewModelParagraph0);
		}
	});
});