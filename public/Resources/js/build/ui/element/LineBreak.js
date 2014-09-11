/**
 * @class build.ui.element.LineBreak
 * @extends build.ui.element.Element
 */
Build('build.ui.element.LineBreak', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function LineBreak(text) {
			$super(this)(text);
		},
		$prototype : {
			type : 'br'
		}
	});
});