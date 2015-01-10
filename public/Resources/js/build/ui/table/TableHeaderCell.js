/**
 * @class build.ui.table.TableHeaderCell
 * @extends build.ui.Container
 */
Build('build.ui.table.TableHeaderCell', [ 'build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TableHeaderCell() {
			$super(this)();
		},
		$prototype : {
			type : 'th'
		}
	});
});