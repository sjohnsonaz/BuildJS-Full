/**
 * @class demo.example.widget.TreeExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.TreeExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.container.list.SimpleTree' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TreeExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Trees');
			this.addChild(header0);

			var tree = build.container.list.SimpleTree.create();
			tree.children = [ 1, 2, [ 3 ], 4 ];
			this.addChild(tree);
		}
	});
});