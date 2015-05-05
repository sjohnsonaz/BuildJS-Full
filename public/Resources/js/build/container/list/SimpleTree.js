/**
 * @class build.container.list.SimpleTree
 * @extends build.ui.Container
 */
Build('build.container.list.SimpleTree', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function SimpleTree() {
			$super(this)();
			this.template = {
				create : function(child, parent) {
					if (child instanceof Array) {
						var list = build.container.list.SimpleTree.create();
						list.bind([ {
							handler : 'forEach',
							source : child,
						} ]);
						return list;
					} else {
						return child;
					}
				}
			};
		},
		$prototype : {
			type : 'ul',
			iteratorType : 'li'
		}
	});
});