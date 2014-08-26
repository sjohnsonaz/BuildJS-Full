/**
 * @class demo.ui.form.ViewModelPanel
 * @extends build.ui.Container
 */
Build('demo.ui.form.ViewModelPanel', [ 'build::build.ui.Container', 'build::build.ui.element.Paragraph', 'build::build.ui.element.Div', 'build::build.ui.form.Text', 'build::build.ui.form.CheckBox', 'build::build.binding.TextBinding',
		'build::build.binding.ValueBinding', 'build::build.binding.IfBinding', 'build::build.binding.ForEachBinding', 'demo::demo.viewmodel.FormModel' ], function(define, $super) {
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
			var viewModelCheckBox0 = build.ui.form.CheckBox.create('test0', 'test0', 'test0');
			var viewModelContainer0 = build.ui.Container.create();
			var viewModelParagraph1 = build.ui.element.Paragraph.create('Evaluated to true!');
			var viewModelParagraph2 = build.ui.element.Paragraph.create('Evaluated to false!');
			var viewModelContainer1 = build.ui.Container.create();
			var viewModelContainer2 = build.ui.Container.create();

			build.binding.TextBinding.create(viewModelParagraph0, {
				sources : [ {
					source : formModel,
					property : 'testValue'
				}, ],
				format : 'This is some text: {0}!'
			});
			build.binding.ValueBinding.create(viewModelText0, formModel, 'testValue');

			build.binding.IfBinding.create(viewModelContainer0, {
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

			build.binding.IfBinding.create(viewModelContainer1, {
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
			build.binding.ValueBinding.create(viewModelCheckBox0, formModel, 'testTrue');

			build.binding.ForEachBinding.create(viewModelContainer2, formModel, 'testArray');

			this.addChild(viewModelText0);
			this.addChild(viewModelParagraph0);
			this.addChild(viewModelCheckBox0);
			this.addChild(viewModelContainer0);
			this.addChild(viewModelContainer1);
			this.addChild(viewModelContainer2);
		}
	});
});