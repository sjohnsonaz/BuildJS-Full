/**
 * @class build.container.table.TableDataCell
 * @extends build.ui.Container
 */
Build('build.container.table.TableDataCell', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TableDataCell() {
			$super(this)();
		},
		$prototype : {
			type : 'td'
		}
	});
});