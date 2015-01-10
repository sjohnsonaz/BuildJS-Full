/**
 * @class build.ui.table.Table
 * @extends build.ui.Container
 */
Build('build.ui.table.Table', [ 'build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Table() {
			$super(this)();
		},
		$prototype : {
			type : 'table'
		}
	});
});