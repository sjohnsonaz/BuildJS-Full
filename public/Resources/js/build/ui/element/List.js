/**
 * @class build.ui.element.List
 * @extends build.ui.element.Element
 */
Build('build.ui.element.List', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function List(text) {
			$super(this)(text);
		},
		$prototype : {
			type : 'li'
		}
	});
});