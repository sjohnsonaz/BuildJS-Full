/**
 * @class demo.example.ExampleContainer
 * @extends build.ui.Container
 */
Build('demo.example.ExampleContainer', [ 'build::build.ui.Container', 'build::build.widget.tab.TabContainer', 'build::build.widget.tab.TabPanel', 'demo::demo.example.widget.WidgetExample', 'demo::demo.example.viewmodel.ViewModelExample',
		'demo::demo.example.remote.RemoteExample', 'demo::demo.example.youtube.YouTubeExample' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function ExampleContainer() {
			$super(this)();
			var tabContainer = build.widget.tab.TabContainer.create();
			var tabPanel0 = build.widget.tab.TabPanel.create('Widget Form');
			var tabPanel1 = build.widget.tab.TabPanel.create('View Model Form');
			var tabPanel2 = build.widget.tab.TabPanel.create('Remote Panel');
			var tabPanel3 = build.widget.tab.TabPanel.create('YouTube Panel');

			// Add form and button
			var widgetExample = demo.example.widget.WidgetExample.create();
			tabPanel0.addChild(widgetExample);

			var viewModelExample = demo.example.viewmodel.ViewModelExample.create();
			tabPanel1.addChild(viewModelExample);

			var remoteExample = demo.example.remote.RemoteExample.create();
			tabPanel2.addChild(remoteExample);

			var youTubeExample = demo.example.youtube.YouTubeExample.create();
			tabPanel3.addChild(youTubeExample);

			tabContainer.addChild(tabPanel0);
			tabContainer.addChild(tabPanel1);
			tabContainer.addChild(tabPanel2);
			tabContainer.addChild(tabPanel3);
			this.addChild(tabContainer);
		}
	});
});