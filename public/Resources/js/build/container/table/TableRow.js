/**
 * @class build.container.table.TableRow
 * @extends build.ui.Container
 */
Build('build.container.table.TableRow', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TableRow() {
			$super(this)();
		},
		$prototype : {
			type : 'tr'
		}
	});
});