/**
 * @class build.container.table.TableFooter
 * @extends build.ui.Container
 */
Build('build.container.table.TableFooter', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
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