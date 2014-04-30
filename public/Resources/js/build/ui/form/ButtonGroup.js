/**
 * @class build.ui.form.ButtonGroup
 * @extends build.ui.Container
 */
Build('build.ui.form.ButtonGroup', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property directAppend
		 */
		$constructor : function ButtonGroup() {
			$super(this)();
			this.directAppend = true;
		}
	});
});