/**
 * @class build.viewmodel.View
 * @extends build.ui.Container
 */
Build('build.viewmodel.View', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function View() {
			$super(this)();
		}
	});
});