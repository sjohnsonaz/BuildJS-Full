/**
 * @class build.container.table.SimpleTable
 * @extends build.ui.Container
 */
Build('build.container.table.SimpleTable', [ 'build::build.ui.Container', 'build::build.binding.ForEachBinding' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function SimpleTable() {
			$super(this)();
			this.header = build.ui.Container.createType('thead');
			this.header.iteratorType = 'th';

			this.body = document.createElement('tbody');
			this.innerElement = this.body;
			this.template = {
				create : function(child, parent) {
					var row = build.ui.Container.createType('tr');
					row.iteratorType = 'td';
					row.bind([ {
						handler : 'forEach',
						source : child,
					} ]);
					return row.element;
				},
				destroy : function(child, element) {

				}
			};
			this.footer = build.ui.Container.createType('tfoot');
			this.footer.iteratorType = 'th';

			this.element.appendChild(this.header.element);
			this.element.appendChild(this.innerElement);
			this.element.appendChild(this.footer.element);
		},
		$prototype : {
			type : 'table'
		}
	});
});