/**
 * @class demo.ui.form.ViewModelPanel
 * @extends build.ui.Container
 */
Build('demo.ui.form.ViewModelPanel', [ 'build::build.ui.Container', 'build::build.ui.element.Paragraph', 'build::build.ui.element.Div', 'build::build.ui.form.Text', 'build::build.binding.TextBinding', 'build::build.binding.ValueBinding',
		'build::build.binding.IfBinding', 'demo::demo.viewmodel.FormModel' ], function(define, $super) {
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
			var viewModeContainer0 = build.ui.Container.create();
			var viewModelParagraph1 = build.ui.element.Paragraph.create('Evaluated to true!');
			var viewModelParagraph2 = build.ui.element.Paragraph.create('Evaluated to false!');
			var viewModeContainer1 = build.ui.Container.create();

			build.binding.TextBinding.create(viewModelParagraph0, {
				sources : [ {
					source : formModel,
					property : 'testValue'
				}, ],
				format : 'This is some text: {0}!'
			});
			build.binding.ValueBinding.create(viewModelText0, formModel, 'testValue');

			build.binding.IfBinding.create(viewModeContainer0, {
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

			build.binding.IfBinding.create(viewModeContainer1, {
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

			this.addChild(viewModelText0);
			this.addChild(viewModelParagraph0);
			this.addChild(viewModeContainer0);
			this.addChild(viewModeContainer1);
		}
	});
});