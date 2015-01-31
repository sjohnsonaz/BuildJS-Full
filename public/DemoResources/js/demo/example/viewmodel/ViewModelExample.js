/**
 * @class demo.example.viewmodel.ViewModelExample
 * @extends build.ui.Container
 */
Build('demo.example.viewmodel.ViewModelExample', [ 'demo::demo.example.viewmodel.TestForm', 'demo::demo.example.viewmodel.TestViewModel', 'demo::demo.example.viewmodel.TestDataDisplay' ], function(define, $super) {
	define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 */
		$constructor : function ViewModelExample() {
			$super(this)();
			var header0 = build.ui.element.Header1.create('View Model Form');
			this.addChild(header0);

			var testViewModel = new demo.example.viewmodel.TestViewModel({
				testValue : 'Test Value',
				testTrue : true,
				testFalse : false,
				testArray : [ 1, 2, 3 ]
			});
			var testForm = demo.example.viewmodel.TestForm.create(testViewModel);
			var testDataDisplay = demo.example.viewmodel.TestDataDisplay.create(testViewModel);
			this.addChild(testForm);
			this.addChild(testDataDisplay);
		}
	});
});