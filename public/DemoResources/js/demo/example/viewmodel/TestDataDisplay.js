/**
 * @class demo.example.viewmodel.TestDataDisplay
 * @extends build.ui.Container
 */
Build('demo.example.viewmodel.TestDataDisplay', [ 'build::build.ui.Container', 'build::build.ui.element.Paragraph', 'build::build.binding.TextBinding', 'build::build.binding.IfBinding', 'build::build.binding.ForEachBinding' ], function($define,
		$super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TestDataDisplay(viewModel) {
			$super(this)();
			this.viewModelParagraph0 = build.ui.element.Paragraph.create('');
			this.viewModelContainer0 = build.ui.Container.create();
			this.viewModelContainer1 = build.ui.Container.create();
			var viewModelParagraph1 = build.ui.element.Paragraph.create('Evaluated to true!');
			var viewModelParagraph2 = build.ui.element.Paragraph.create('Evaluated to false!');

			this.bind({
				viewModelParagraph0 : [ {
					handler : 'oneWay',
					property : 'rawText',
					sources : [ {
						source : viewModel,
						property : 'testValue'
					}, ],
					output : 'This is some text: {0}!'
				} ],
				viewModelContainer0 : [ {
					handler : 'if',
					sources : [ {
						source : viewModel,
						property : 'testTrue'
					}, {
						source : viewModel,
						property : 'testFalse'
					} ],
					format : '{0} && !{1}',
					onTrue : viewModelParagraph1,
					onFalse : viewModelParagraph2
				} ],
				viewModelContainer1 : [ {
					handler : 'if',
					sources : [ {
						source : viewModel,
						property : 'testTrue'
					}, {
						source : viewModel,
						property : 'testFalse'
					} ],
					format : '{0} && !{1}',
					onTrue : function() {
						var innerParagraph = build.ui.element.Paragraph.create();
						innerParagraph.bind([ {
							handler : 'oneWay',
							property : 'rawText',
							sources : [ {
								source : viewModel,
								property : 'testTrue'
							}, {
								source : viewModel,
								property : 'testFalse'
							} ],
							output : 'This is dynamically generated because: ({0} && !{1})'
						} ]);
						return innerParagraph;
					},
					onFalse : null
				} ]
			});

			this.addChild(this.viewModelParagraph0);
			this.addChild(this.viewModelContainer0);
			this.addChild(this.viewModelContainer1);
		}
	});
});