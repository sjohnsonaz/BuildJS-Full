/**
 * @class build.widget.tab.TabLink
 * @extends build.ui.Container
 */
Build('build.widget.tab.TabLink', [ 'build::build.ui.Content', 'build::build.binding.TextBinding', 'build::build.ui.element.Link' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Content',
		/**
		 * @constructor
		 */
		$constructor : function TabLink() {
			$super(this)();
		},
		$prototype : {
			type : 'a',
		}
	});
});