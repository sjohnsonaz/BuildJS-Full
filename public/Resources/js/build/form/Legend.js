/**
 * @class build.form.Legend
 * @extends build.ui.Container
 */
Build('build.form.Legend', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 * @param text
		 */
		/**
		 * @property type
		 */
		$constructor : function Legend(text) {
			$super(this)(text);
		},
		$prototype : {
			type : 'legend'
		}
	});
});