/**
 * @class build.ui.form.Legend
 * @extends build.ui.element.Element
 */
Build('build.ui.form.Legend', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
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