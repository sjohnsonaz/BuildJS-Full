var timeStart = 0;
var timeBody = 0;
if (typeof performance !== 'undefined' && performance.now) {
	timeStart = performance.now();
}
Build.paths.main = '/Resources/js/';
Build.paths.build = '/Resources/js/';
Build.paths.demo = '/DemoResources/js/';

/**
 * @class demo.application.DemoApplication
 * @extends build.application.AdminApplication
 */
Build('demo.application.DemoApplication', [ 'build::build.application.AdminApplication', 'build::build.widget.menu.MenuElement', 'demo::demo.example.ExampleContainer' ], function($define, $super) {
	$define({
		$extends : 'build.application.AdminApplication',
		/**
		 * @constructor
		 */
		$constructor : function DemoApplication() {
			$super(this)();

			// Add title
			this.title = 'BuildJS';

			var lastMenuItem = this.menu.children[this.menu.children.length - 1];

			var menuElement0 = build.widget.menu.MenuElement.create();
			menuElement0.text = 'My Link 0';
			menuElement0.url = 'test.html';
			this.menu.addChild(menuElement0, lastMenuItem);
			var menuElement1 = build.widget.menu.MenuElement.create();
			menuElement1.text = 'My Link 1';
			menuElement1.url = 'test.html';
			this.menu.addChild(menuElement1, lastMenuItem);

			// Add tab container
			var exampleContainer = demo.example.ExampleContainer.create();
			this.homePanel.addChild(exampleContainer);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
			}
		}
	});
});
Build.debug = true;
var application;
Build(function() {
	console.log('Application started...');
	application = demo.application.DemoApplication.create();
	application.run(document.body);
	if (performance && performance.now) {
		timeBody = performance.now();
		console.log('Time to body draw: ' + (timeBody - timeStart));
	}
});