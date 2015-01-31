/**
 * @class demo.example.viewmodel.ViewModelExample
 * @extends build.ui.Container
 */
Build('demo.example.viewmodel.ViewModelExample', [ 'build::build.form.Form', 'build::build.ui.element.Paragraph', 'build::build.ui.element.Div', 'build::build.form.input.Text', 'build::build.form.input.CheckBox', 'build::build.binding.TextBinding',
		'build::build.binding.ValueBinding', 'build::build.binding.IfBinding', 'build::build.binding.ForEachBinding', 'demo::demo.example.viewmodel.FormModel' ], function(define, $super) {
	define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 */
		$constructor : function ViewModelExample() {
			$super(this)();
			var header0 = build.ui.element.Header1.create('View Model Form');
			this.addChild(header0);

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

			var formModel = new demo.example.viewmodel.FormModel({
				testValue : 'Test Value',
				testTrue : true,
				testFalse : false,
				testArray : [ 1, 2, 3 ]
			});
			this.mapViewModel({
				testValue : {},
				testTrue : {},
				testArray : {}
			}, formModel);

			this.viewModelParagraph0 = build.ui.element.Paragraph.create('');
			build.binding.TextBinding.create(this.viewModelParagraph0, {
				sources : [ {
					source : formModel,
					property : 'testValue'
				}, ],
				format : 'This is some text: {0}!'
			});
			this.viewModelContainer0 = build.ui.Container.create();
			var viewModelParagraph1 = build.ui.element.Paragraph.create('Evaluated to true!');
			var viewModelParagraph2 = build.ui.element.Paragraph.create('Evaluated to false!');
			build.binding.IfBinding.create(this.viewModelContainer0, {
				sources : [ {
					source : formModel,
					property : 'testTrue'
				}, {
					source : formModel,
					property : 'testFalse'
				} ],
				format : '{0} && !{1}',
				onTrue : viewModelParagraph1,
				onFalse : viewModelParagraph2
			});
			this.viewModelContainer1 = build.ui.Container.create();
			build.binding.IfBinding.create(this.viewModelContainer1, {
				sources : [ {
					source : formModel,
					property : 'testTrue'
				}, {
					source : formModel,
					property : 'testFalse'
				} ],
				format : '{0} && !{1}',
				onTrue : function() {
					var innerParagraph = build.ui.element.Paragraph.create();
					build.binding.TextBinding.create(innerParagraph, {
						sources : [ {
							source : formModel,
							property : 'testTrue'
						}, {
							source : formModel,
							property : 'testFalse'
						} ],
						format : 'This is dynamically generated because: ({0} && !{1})'
					});
					return innerParagraph;
				},
				onFalse : null
			});

			this.addChild(this.testValue);
			this.addChild(this.viewModelParagraph0);
			this.addChild(this.testTrue);
			this.addChild(this.viewModelContainer0);
			this.addChild(this.viewModelContainer1);
			this.addChild(this.testArray);
		}
	});
});