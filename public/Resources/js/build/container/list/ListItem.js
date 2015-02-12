/**
 * @class build.container.list.ListItem
 * @extends build.ui.Container
 */
Build('build.container.list.ListItem', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
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