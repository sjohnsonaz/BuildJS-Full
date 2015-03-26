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
			this.tbody = document.createElement('tbody');
			this.innerElement = this.tbody;
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
			this.element.appendChild(this.innerElement);
		},
		$prototype : {
			type : 'table'
		}
	});
});