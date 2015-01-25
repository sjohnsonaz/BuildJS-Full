/**
 * @class build.container.list.ListItem
 * @extends build.ui.element.Element
 */
Build('build.container.list.ListItem', [ 'build::build.ui.element.Element' ], function(define, $super) {
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