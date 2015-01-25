/**
 * @class build.container.table.Column
 * @extends build.ui.Container
 */
Build('build.container.table.Column', [ 'build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Column() {
			$super(this)();
		},
		$prototype : {
			type : 'col'
		}
	});
});