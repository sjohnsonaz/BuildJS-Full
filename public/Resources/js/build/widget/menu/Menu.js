/**
 * @class build.widget.menu.Menu
 * @extends build.ui.Container
 */
Build('build.widget.menu.Menu', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Menu() {
			$super(this)();
			this.template = {
				create : function(child, parent) {
					if (child instanceof Array) {
						var list = build.widget.menu.Menu.create();
						list.bind([ {
							handler : 'forEach',
							source : child,
						} ]);
						return list.element;
					} else {
						return child;
					}
				},
				destroy : function(child, element) {

				}
			};
		},
		$prototype : {
			type : 'ul',
			iteratorType : 'li'
		}
	});
});