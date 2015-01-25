/**
 * @class build.container.table.TableHeader
 * @extends build.ui.Container
 */
Build('build.container.table.TableHeader', [ 'build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TableHeader() {
			$super(this)();
			this.innerElement = document.createElement('tr');
		},
		$prototype : {
			type : 'thead'
		}
	});
});