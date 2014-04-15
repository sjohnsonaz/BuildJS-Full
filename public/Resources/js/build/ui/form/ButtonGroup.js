/**
 * @class build.ui.form.ButtonGroup
 * @extends build.ui.Widget
 */
Build('build.ui.form.ButtonGroup', [ 'build::build.ui.Widget' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.Widget',
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