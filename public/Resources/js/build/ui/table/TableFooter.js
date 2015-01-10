/**
 * @class build.ui.table.TableFooter
 * @extends build.ui.Container
 */
Build('build.ui.table.TableFooter', [ 'build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TableFooter() {
			$super(this)();
			this.innerElement = document.createElement('tr');
		},
		$prototype : {
			type : 'tfoot'
		}
	});
});