/**
 * @class build.ui.table.Caption
 * @extends build.ui.Container
 */
Build('build.ui.table.Caption', [ 'build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Caption() {
			$super(this)();
		},
		$prototype : {
			type : 'caption'
		}
	});
});