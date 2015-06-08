/**
 * @class build.form.container.ButtonGroup
 * @extends build.ui.Container
 */
Build('build.form.container.ButtonGroup', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 */
		$constructor : function ButtonGroup() {
			$super(this)();
			this.classList.add('button-group');
		}
	});
});