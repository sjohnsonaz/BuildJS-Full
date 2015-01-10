/**
 * @class build.ui.table.TableDataCell
 * @extends build.ui.Container
 */
Build('build.ui.table.TableDataCell', [ 'build.ui.Container' ], function(define, $super) {
	define({
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