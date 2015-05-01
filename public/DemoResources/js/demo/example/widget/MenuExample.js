/**
 * @class demo.example.widget.MenuExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.MenuExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.widget.menu.Menu' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function MenuExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Menus');
			this.addChild(header0);

			var menu = build.widget.menu.Menu.create('Menu');
			menu.children = [ 1, {
				text : 2
			}, {
				text : 3,
				children : [ 4, '|', {
					text : 5,
					children : [ 6 ]
				} ]
			}, 7, '|', 8, {
				text : 9,
				widget : true,
				children : [ 'Menu Container' ]
			} ];
			this.addChild(menu);
		}
	});
});