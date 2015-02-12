/**
 * @class build.container.table.Caption
 * @extends build.ui.Container
 */
Build('build.container.table.Caption', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
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