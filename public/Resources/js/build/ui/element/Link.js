/**
 * @class build.ui.element.Link
 * @extends build.ui.Widget
 */
Build('build.ui.element.Link', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Link(text) {
			$super(this)(text);
			this.type = 'a';
		}
	});
});