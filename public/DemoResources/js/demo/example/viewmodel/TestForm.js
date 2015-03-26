/**
 * @class demo.example.viewmodel.TestForm
 * @extends build.form.Form
 */
Build('demo.example.viewmodel.TestForm', [ 'build::build.form.Form', 'build::build.form.input.Text', 'build::build.form.input.CheckBox', 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 */
		$constructor : function TestForm(viewModel) {
			$super(this)();
			this.testValue = build.form.input.Text.create();
			this.testTrue = build.form.input.CheckBox.create('test0', 'test0', 'test0');
			this.testArray = build.ui.Container.create();
			this.testArray.template = (function() {
				return {
					create : function(child) {
						return 'element: ' + child;
					},
					destroy : function(child) {
					}
				};
			})();
			this.bind({
				testValue : [ {
					handler : 'value',
					source : viewModel,
					sourceProperty : 'testValue'
				} ],
				testTrue : [ {
					handler : 'value',
					source : viewModel,
					sourceProperty : 'testTrue'
				} ],
				testArray : [ {
					handler : 'forEach',
					source : viewModel,
					sourceProperty : 'testArray'
				} ]
			});
			this.addChild(this.testValue);
			this.addChild(this.testTrue);
			this.addChild(this.testArray);
		}
	});
});