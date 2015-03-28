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
						var row = build.container.list.SimpleTree.create();
						if (!(child instanceof Array)) {
							child = self.itemToRow(child);
						}
						row.bind([ {
							handler : 'forEach',
							source : child,
						} ]);
						return row.element;
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