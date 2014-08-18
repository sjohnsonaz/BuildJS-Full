/**
 * @class demo.ui.form.ViewModelPanel
 * @extends build.ui.Container
 */
Build('demo.ui.form.ViewModelPanel', [ 'build::build.ui.Container' ], function(define, $super) {
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
			formModel.handlers.value = function(value) {
				this.testValue = value;
			}.bind(formModel);

			var viewModelText0 = build.ui.form.Text.create();
			viewModelText0.subscribe('value', formModel);

			var viewModelParagraph0 = build.ui.element.Paragraph.create('');
			viewModelParagraph0.handlers.testValue = function(value) {
				this.text = value;
			}.bind(viewModelParagraph0);
			formModel.subscribe('testValue', viewModelParagraph0);

			this.addChild(viewModelText0);
			this.addChild(viewModelParagraph0);
		}
	});
});