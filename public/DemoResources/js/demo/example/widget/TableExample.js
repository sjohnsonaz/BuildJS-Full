/**
 * @class demo.example.widget.TableExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.TableExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.container.table.SimpleTable', 'build::build.widget.progress.ProgressBar' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TableExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Tables');
			this.addChild(header0);

			var table = build.container.table.SimpleTable.create();
			table.children.push([ 1, 2, 3, 4 ]);
			table.children.push([ 5, 6, 7, 8 ]);
			this.addChild(table);
		}
	});
});