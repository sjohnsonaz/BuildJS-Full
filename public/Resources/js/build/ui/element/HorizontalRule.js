/**
 * @class build.ui.element.HorizontalRule
 * @extends build.ui.element.Element
 */
Build('build.ui.element.HorizontalRule', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function HorizontalRule(text) {
			$super(this)(text);
		},
		$prototype : {
			type : 'hr'
		}
	});
});