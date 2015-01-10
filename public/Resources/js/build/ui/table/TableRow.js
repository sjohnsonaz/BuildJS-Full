/**
 * @class build.ui.table.TableRow
 * @extends build.ui.Container
 */
Build('build.ui.table.TableRow', [ 'build.ui.Container' ], function(define, $super) {
	define({
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