/**
 * @class build.ui.element.LineBreak
 * @extends build.ui.Widget
 */
Build('build.ui.element.LineBreak', [ 'build::build.ui.element.Element' ], function(define, $super, merge) {
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
			this.type = 'br';
		}
	});
});