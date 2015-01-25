/**
 * @class build.container.table.ColumnGroup
 * @extends build.ui.Container
 */
Build('build.container.table.ColumnGroup', [ 'build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function ColumnGroup() {
			$super(this)();
		},
		$prototype : {
			type : 'colgroup'
		}
	});
});